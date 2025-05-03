
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Volume2, VolumeX, MessageCircle, X, Users, UserPlus, ScreenShare, ScreenShareOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

interface GlaadooData {
  gratitude: string;
  lessonLearned: string;
  affirmation: string;
  achievement: string;
  delight: string;
  opportunityBetter: string;
  opportunityHelp: string;
}

const VideoConference = () => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [participantCount, setParticipantCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHangingUp, setIsHangingUp] = useState(false);
  const hasLeftConference = useRef(false); // Track if we've already shown the "left conference" toast
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false); // New loading state
  
  // New state for GLAADOO reflection panel
  const [isGlaadooOpen, setIsGlaadooOpen] = useState(false);
  const location = useLocation();
  const glaadooData = location.state?.glaadooData as GlaadooData || null;
  const [userData, setUserData] = useState<{ fullName?: string, email?: string } | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    // Function to load the Jitsi script
    const loadJitsiScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="external_api.js"]')) {
        // Script already exists, initialize Jitsi directly
        initializeJitsi();
        return () => {}; // No cleanup needed for script
      }

      const script = document.createElement("script");
      script.src = "https://8x8.vc/vpaas-magic-cookie-9249f82878664dd9bc23342b4ba9d9ea/external_api.js";
      script.async = true;
      
      // Create a reference to the script for proper cleanup
      let scriptRef = script;
      
      script.onload = () => {
        setIsJitsiLoaded(true);
        initializeJitsi();
      };
      
      script.onerror = () => {
        toast.error("Failed to load video conference. Please refresh and try again.");
        setIsJitsiLoaded(false);
      };
      
      document.body.appendChild(script);

      return () => {
        // Only remove the script if it's still in the document
        if (document.body.contains(scriptRef)) {
          document.body.removeChild(scriptRef);
        }
      };
    };

    // Function to initialize the Jitsi Meet API
    const initializeJitsi = () => {
      if (!window.JitsiMeetExternalAPI) {
        toast.error("Jitsi Meet API not loaded!");
        return;
      }

      if (jitsiContainerRef.current) {
        try {
          const domain = "8x8.vc";
          const options = {
            roomName: "vpaas-magic-cookie-9249f82878664dd9bc23342b4ba9d9ea/SampleAppEmotionalCostsFearLate",
            parentNode: jitsiContainerRef.current,
            height: "100%",
            width: "100%",
            userInfo: {
              displayName: userData?.fullName || "GLAADOO User",
              email: userData?.email || "",
            },
            configOverwrite: {
              prejoinPageEnabled: false,
              startWithAudioMuted: false,
              hideLogo: true,
              disableThirdPartyRequests: true,
              disableBrandWatermark: true,
              disableProfile: true,
              removeApplicationLogoFromWatermark: true,
              doNotStoreRoom: true,
              // Optimized local video settings to ensure visibility
              localVideoSetting: {
                disableSelfView: false,
                disable: false,
                hidden: false
              },
              // Enable webcam access and show local video by default
              startWithVideoMuted: false,
              // Force video display
              constraints: {
                video: {
                  height: {
                    ideal: 720,
                    max: 720,
                    min: 240
                  }
                }
              }
            },
            interfaceConfigOverwrite: {
              TOOLBAR_BUTTONS: [],
              SHOW_JITSI_WATERMARK: false,
              DEFAULT_BACKGROUND: "#17252A",
              SHOW_BRAND_WATERMARK: false,
              BRAND_WATERMARK_LINK: "",
              SHOW_WATERMARK_FOR_GUESTS: false,
              INVITATION_POWERED_BY: false,
              DISPLAY_WELCOME_PAGE_CONTENT: false,
              DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
              APP_NAME: "GLAADOO Conference",
              NATIVE_APP_NAME: "GLAADOO Conference",
              PROVIDER_NAME: "",
              DEFAULT_REMOTE_DISPLAY_NAME: "Participant",
              DEFAULT_LOCAL_DISPLAY_NAME: "You",
              JITSI_WATERMARK_LINK: "",
              DISABLE_VIDEO_BACKGROUND: false,
              filmStripOnly: false,
              // Ensure self view is enabled
              DISABLE_SELF_VIEW: false,
              // Ensure local video is displayed
              VIDEO_QUALITY_LABEL_DISABLED: false,
              TILE_VIEW_ENABLED: true // Force tile view to ensure video visibility
            },
          };

          apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
          
          apiRef.current.addEventListeners({
            videoConferenceJoined: () => {
              toast.success("You have joined the conference");
              
              // Single check for video status after join - reduces unnecessary API calls
              setTimeout(() => {
                if (apiRef.current) {
                  apiRef.current.isVideoMuted().then((muted: boolean) => {
                    setIsVideoOff(muted);
                    // Ensure video layout is properly rendered
                    if (!muted) {
                      apiRef.current.executeCommand('setTileView', true);
                    }
                  }).catch((error: any) => {
                    console.error("Error checking video state:", error);
                  });
                }
              }, 1000);
            },
            videoConferenceLeft: () => {
              // Only show the toast if we haven't manually triggered the hangup
              if (!isHangingUp && !hasLeftConference.current) {
                toast.info("You have left the conference");
                hasLeftConference.current = true;
              }
            },
            audioMuteStatusChanged: (data: { muted: boolean }) => {
              setIsMuted(data.muted);
            },
            videoMuteStatusChanged: (data: { muted: boolean }) => {
              // Simple, direct update of state based on Jitsi's report
              setIsVideoOff(data.muted);
            },
            screenSharingStatusChanged: (data: { on: boolean }) => {
              setIsScreenSharing(data.on);
            },
            // Listen for incoming messages
            incomingMessage: (data: { from: string; message: string }) => {
              const newMessage = {
                sender: data.from || 'Participant',
                message: data.message,
                timestamp: new Date()
              };
              setChatMessages(prev => [...prev, newMessage]);
              if (!isChatOpen) {
                toast.info(`New message from ${data.from}`);
              }
            },
            participantJoined: (data: { id: string; displayName: string }) => {
              setParticipantCount(prev => prev + 1);
              toast.info(`${data.displayName || 'A participant'} joined`);
            },
            participantLeft: (data: { id: string; displayName: string }) => {
              setParticipantCount(prev => Math.max(1, prev - 1));
              toast.info(`${data.displayName || 'A participant'} left`);
            },
            videoQualityChanged: () => {
              // Added to monitor video quality changes
              if (apiRef.current && !isVideoOff) {
                apiRef.current.executeCommand('setTileView', true);
              }
            }
          });
        } catch (error) {
          console.error("Failed to initialize Jitsi:", error);
          toast.error("Failed to initialize video conference");
        }
      }
    };

    const cleanup = loadJitsiScript();
    
    // Reset the hasLeftConference flag when component mounts
    hasLeftConference.current = false;

    // Clean up on unmount
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
      if (cleanup) cleanup();
    };
  }, [userData]);

  // Control functions
  const toggleAudio = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  };

  const toggleVideo = () => {
    if (apiRef.current) {
      try {
        // Simplified video toggle with promise handling
        apiRef.current.executeCommand('toggleVideo');
        
        // Use a single check after toggle
        setTimeout(() => {
          apiRef.current.isVideoMuted()
            .then((muted: boolean) => {
              setIsVideoOff(muted);
              // If video is now on, make sure it's visible
              if (!muted) {
                apiRef.current.executeCommand('setTileView', true);
              }
            })
            .catch((error: any) => {
              console.error("Error checking video mute state:", error);
            });
        }, 300);
      } catch (error) {
        toast.error("Failed to toggle video");
      }
    }
  };

  const toggleScreenShare = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleShareScreen');
    }
  };

  const toggleAudioOutput = () => {
    setIsAudioMuted(!isAudioMuted);
    // Note: Jitsi doesn't have a direct API for this, 
    // we're just toggling the state for UI purposes
  };

  const hangUp = () => {
    if (apiRef.current && !isHangingUp) {
      setIsHangingUp(true);
      
      // Mark that we're leaving the conference to prevent duplicate toasts
      hasLeftConference.current = true;
      
      // Show our "left conference" toast
      toast.info("You have left the conference");
      
      // Execute the hangup command
      apiRef.current.executeCommand('hangup');
      
      // Reset the hanging up state after a short delay
      setTimeout(() => {
        setIsHangingUp(false);
      }, 1000);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !apiRef.current) return;

    try {
      // Add the message to our local state first for immediate feedback
      const newMessage = {
        sender: 'You',
        message: messageInput,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      // Then send it through Jitsi API
      apiRef.current.executeCommand('sendEndpointTextMessage', '', messageInput);
      
      setMessageInput('');
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChat = () => {
    // Close GLAADOO panel if open
    if (isGlaadooOpen) {
      setIsGlaadooOpen(false);
    }
    // Toggle the chat state
    setIsChatOpen(prev => !prev);
  };
  
  // New function to toggle GLAADOO reflection panel
  const toggleGlaadoo = () => {
    // Close chat if open
    if (isChatOpen) {
      setIsChatOpen(false);
    }
    
    // Toggle the GLAADOO reflection state
    setIsGlaadooOpen(prev => !prev);
    
    // If opening and we don't have data, show warning
    if (!isGlaadooOpen && !glaadooData) {
      toast.warning("No GLAADOO reflection data available");
    }
  };
  
  // Custom icon for the GLAADOO button
  const GlaadooIcon = () => (
    <div className="flex items-center justify-center w-5 h-5 font-bold text-white bg-[#3AAFA9] rounded-full shadow-[0_0_10px_rgba(58,175,169,0.7)]">
      G
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <div className="p-4 flex items-center justify-between bg-black/20 backdrop-blur-sm border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">GLAADOO Conference</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {userData?.fullName && (
              <div className="bg-[#2B2F3C] text-[#3AAFA9] px-3 py-1 rounded-full text-sm">
                {userData.fullName}
              </div>
            )}
            <div className="flex items-center bg-[#2B2F3C] rounded-full px-3 py-1">
              <Users className="h-4 w-4 text-[#3AAFA9] mr-2" />
              <span className="text-sm font-medium text-white">{participantCount}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-[#2B2F3C] hover:bg-[#3A3F4C] text-white"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Meeting link copied to clipboard");
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>
      
      <div className="relative flex-grow">
        {/* Show loading indicator while Jitsi loads */}
        {!isJitsiLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1F2C]/80 z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3AAFA9] mx-auto mb-4"></div>
              <p>Loading video conference...</p>
            </div>
          </div>
        )}
        
        {/* Main video area */}
        <div 
          ref={jitsiContainerRef} 
          className="absolute inset-0 z-0"
          id="jaas-container"
        />
        
        {/* Chat panel - only render when chat is open */}
        {isChatOpen && (
          <div className="absolute left-5 top-5 bottom-32 max-w-xs w-full bg-[#17252A]/95 border border-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col z-10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h3 className="text-sm font-medium text-white">Conference Chat</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="h-7 w-7 hover:bg-white/10"
              >
                <X className="h-4 w-4 text-white/70" />
              </Button>
            </div>
            
            <ScrollArea className="flex-grow p-4" style={{ height: 'calc(100% - 110px)' }}>
              {chatMessages.length === 0 ? (
                <div className="text-center py-8 text-white/50 text-sm">
                  No messages yet
                </div>
              ) : (
                <>
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`max-w-[85%] rounded-lg p-3 mb-3 ${
                        msg.sender === 'You' 
                          ? 'ml-auto bg-[#3AAFA9] text-white' 
                          : 'mr-auto bg-[#2B7A78] text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{msg.sender}</span>
                        <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </ScrollArea>
            
            <form onSubmit={sendMessage} className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-grow text-sm bg-[#17252A] border-white/10 text-white placeholder:text-white/50"
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="sm" 
                  disabled={!messageInput.trim()}
                  className="bg-[#3AAFA9] hover:bg-[#2B7A78] text-white"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {/* GLAADOO Reflection Panel - only render when GLAADOO is open */}
        {isGlaadooOpen && (
          <div className="absolute left-5 top-5 bottom-32 max-w-xs w-full bg-[#17252A]/95 border border-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col z-10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#2B7A78]">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 font-bold text-white bg-[#3AAFA9] rounded-full shadow-[0_0_10px_rgba(58,175,169,0.7)]">
                  G
                </div>
                <h3 className="text-sm font-medium text-white">GLAADOO Reflection</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleGlaadoo}
                className="h-7 w-7 hover:bg-white/10"
              >
                <X className="h-4 w-4 text-white/70" />
              </Button>
            </div>
            
            <ScrollArea className="flex-grow p-4">
              {!glaadooData ? (
                <div className="text-center py-8 text-white/50 text-sm">
                  No GLAADOO reflection data available
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">G - Gratitude</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.gratitude}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">L - Lesson Learned</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.lessonLearned}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">A - Affirmation</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.affirmation}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">A - Achievement</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.achievement}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">D - Delight</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.delight}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">O - Opportunity to Better</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.opportunityBetter}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-[#3AAFA9]">O - Opportunity to Help Another</h4>
                    <p className="text-sm text-white bg-[#2B7A78]/50 p-3 rounded-md">{glaadooData.opportunityHelp}</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
      
      {/* Control bar */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/10 py-4 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4">
            {/* New GLAADOO Reflection button */}
            <Button 
              onClick={toggleGlaadoo}
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isGlaadooOpen 
                  ? 'bg-[#3AAFA9]/20 border-[#3AAFA9]/50 text-[#3AAFA9]' 
                  : 'bg-[#3A3F4C] border-white/10 text-white hover:bg-[#4A4F5C]'
              }`}
              title="View GLAADOO Reflection"
            >
              <GlaadooIcon />
            </Button>
            
            <Button 
              onClick={toggleAudio}
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isMuted 
                  ? 'bg-red-500/20 border-red-500/50 text-red-500' 
                  : 'bg-[#3A3F4C] border-white/10 text-white hover:bg-[#4A4F5C]'
              }`}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            
            <Button 
              onClick={toggleVideo}
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isVideoOff 
                  ? 'bg-red-500/20 border-red-500/50 text-red-500' 
                  : 'bg-[#3AAFA9]/20 border-[#3AAFA9]/50 text-[#3AAFA9]'
              }`}
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
            
            <Button 
              onClick={toggleScreenShare}
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isScreenSharing 
                  ? 'bg-[#3AAFA9]/20 border-[#3AAFA9]/50 text-[#3AAFA9]' 
                  : 'bg-[#3A3F4C] border-white/10 text-white hover:bg-[#4A4F5C]'
              }`}
            >
              {isScreenSharing ? <ScreenShareOff /> : <ScreenShare />}
            </Button>
            
            <Button 
              onClick={toggleAudioOutput}
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isAudioMuted 
                  ? 'bg-red-500/20 border-red-500/50 text-red-500' 
                  : 'bg-[#3A3F4C] border-white/10 text-white hover:bg-[#4A4F5C]'
              }`}
            >
              {isAudioMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            
            <Button 
              onClick={toggleChat} 
              variant="outline" 
              size="icon"
              className={`rounded-full h-12 w-12 ${
                isChatOpen 
                  ? 'bg-[#3AAFA9]/20 border-[#3AAFA9]/50 text-[#3AAFA9]' 
                  : 'bg-[#3A3F4C] border-white/10 text-white hover:bg-[#4A4F5C]'
              }`}
            >
              <MessageCircle />
            </Button>
            
            <Button 
              onClick={hangUp}
              variant="destructive"
              size="icon"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full h-12 w-12"
            >
              <PhoneOff />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
