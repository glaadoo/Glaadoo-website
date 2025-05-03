
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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
          <h1 className="text-4xl font-bold text-secondary mb-6">Terms of Service</h1>

          <div className="prose prose-lg max-w-none text-secondary/80 space-y-6">
            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using GLAADOO's services, you agree to be bound by these Terms of
                Service and our Privacy Policy. Please read them carefully before using our platform.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain the confidentiality of your account information</li>
                <li>Provide accurate and truthful information</li>
                <li>Use the platform respectfully and professionally</li>
                <li>Report any violations or concerns promptly</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">3. Platform Rules</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-secondary">Prohibited Activities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Harassment or bullying of other users</li>
                  <li>Sharing inappropriate or harmful content</li>
                  <li>Impersonating others or creating false accounts</li>
                  <li>Attempting to compromise platform security</li>
                  <li>Commercial solicitation without authorization</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">4. Content Guidelines</h2>
              <p className="mb-4">
                Users are responsible for the content they share. Content must be appropriate,
                respectful, and aligned with our community guidelines. We reserve the right to
                remove content that violates these terms.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">5. Termination</h2>
              <p className="mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms
                or engage in harmful behavior. Users may also terminate their accounts at any time.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:terms@glaadoo.com" className="text-primary hover:underline">
                  terms@glaadoo.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
