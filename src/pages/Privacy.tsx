
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-secondary/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-secondary mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-secondary/80 space-y-6">
            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Overview</h2>
              <p className="mb-4">
                At GLAADOO, we take your privacy seriously. This Privacy Policy describes how we collect,
                use, and handle your personal information when you use our peer-to-peer support network.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-secondary">1. Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Profile information (anonymous username)</li>
                  <li>Communication preferences</li>
                  <li>Usage data and analytics</li>
                  <li>Support messages and interactions</li>
                </ul>

                <h3 className="text-xl font-medium text-secondary">2. Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Log data and device information</li>
                  <li>Interaction patterns and preferences</li>
                  <li>Feature usage statistics</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our peer support services</li>
                <li>To match you with appropriate support connections</li>
                <li>To ensure platform safety and security</li>
                <li>To analyze and enhance user experience</li>
                <li>To communicate important updates and information</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information,
                including encryption, secure servers, and regular security audits.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@glaadoo.com" className="text-primary hover:underline">
                  privacy@glaadoo.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
