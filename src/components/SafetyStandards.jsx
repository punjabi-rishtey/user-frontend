import React from "react";

const SafetyStandards = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-lg text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🛡️ Safety Standards & Child Protection Policy</h1>
          <p className="text-xl opacity-90">Punjabi Rishtey - Committed to User Safety and Child Protection</p>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">NCMEC Compliant</span>
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">COPPA Compliant</span>
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">GDPR Compliant</span>
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">Age Verified</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Section 1: Our Commitment to Safety */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              1. Our Commitment to Safety
            </h2>
            <p className="text-lg mb-6">
              Punjabi Rishtey is committed to providing a safe, secure, and respectful environment for all users. 
              We have zero tolerance for any form of child sexual abuse and exploitation (CSAE), harassment, or 
              inappropriate behavior on our platform.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-3">🔒 Zero Tolerance Policy</h4>
              <p className="text-blue-700">
                We maintain a strict zero-tolerance policy against any form of child sexual abuse and exploitation. 
                Any user found engaging in such activities will be immediately banned and reported to the appropriate authorities.
              </p>
            </div>
          </section>

          {/* Section 2: Age Verification */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              2. Age Verification & Minimum Age Requirements
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">2.1 Age Verification Process</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>Minimum Age:</strong> All users must be at least 18 years old to use our platform</li>
              <li><strong>Identity Verification:</strong> We require government-issued ID verification for all new accounts</li>
              <li><strong>Date of Birth Verification:</strong> All users must provide accurate date of birth information</li>
              <li><strong>Ongoing Monitoring:</strong> We continuously monitor and verify user ages through various methods</li>
            </ul>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <h4 className="text-xl font-bold text-red-800 mb-3">⚠️ Age Verification Requirements</h4>
              <p className="text-red-700">
                Users under 18 are strictly prohibited from using our platform. Any attempt to create an account 
                with false age information will result in immediate account termination and potential legal action.
              </p>
            </div>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">2.2 Age Verification Methods</h3>
            <ol className="list-decimal pl-8 space-y-2">
              <li><strong>Government ID Upload:</strong> Users must upload a clear photo of their government-issued ID</li>
              <li><strong>Document Verification:</strong> Our team manually verifies all submitted documents</li>
              <li><strong>Cross-Reference Check:</strong> We cross-reference information with public databases when necessary</li>
              <li><strong>Video Verification:</strong> Additional video verification may be required for suspicious accounts</li>
            </ol>
          </section>

          {/* Section 3: Content Moderation */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              3. Content Moderation & Safety Measures
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">3.1 Automated Content Scanning</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>AI-Powered Detection:</strong> We use advanced AI to scan all uploaded content for inappropriate material</li>
              <li><strong>Image Analysis:</strong> All profile pictures and uploaded images are scanned for inappropriate content</li>
              <li><strong>Text Analysis:</strong> Messages and profile descriptions are monitored for inappropriate language</li>
              <li><strong>Real-time Monitoring:</strong> Continuous monitoring of user interactions and content</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">3.2 Human Moderation</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>24/7 Moderation Team:</strong> Our dedicated team monitors the platform around the clock</li>
              <li><strong>Expert Review:</strong> Trained professionals review flagged content and user reports</li>
              <li><strong>Rapid Response:</strong> Immediate action on any suspected CSAE content or behavior</li>
            </ul>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
              <h4 className="text-xl font-bold text-yellow-800 mb-3">🚨 Prohibited Content</h4>
              <p className="text-yellow-700 mb-3">The following content is strictly prohibited and will result in immediate account termination:</p>
              <ul className="list-disc pl-6 text-yellow-700 space-y-1">
                <li>Any content involving minors or individuals under 18</li>
                <li>Sexually explicit content involving minors</li>
                <li>Inappropriate or suggestive content involving children</li>
                <li>Any form of grooming or predatory behavior</li>
                <li>Harassment, bullying, or threatening behavior</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Reporting Procedures */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              4. Reporting & Response Procedures
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">4.1 How to Report</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>In-App Reporting:</strong> Use the "Report User" button on any profile or message</li>
              <li><strong>Email Reporting:</strong> Send detailed reports to safety@punjabirishtey.com</li>
              <li><strong>Emergency Hotline:</strong> Call our 24/7 safety hotline at +1-800-SAFETY-1</li>
              <li><strong>Anonymous Reporting:</strong> Submit anonymous reports through our secure form</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">4.2 Response Timeline</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>Immediate Response:</strong> Reports of CSAE are addressed within 1 hour</li>
              <li><strong>Standard Reports:</strong> Other safety reports are addressed within 24 hours</li>
              <li><strong>Follow-up:</strong> We provide updates on report status within 48 hours</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">4.3 Law Enforcement Cooperation</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Immediate Reporting:</strong> All CSAE cases are immediately reported to NCMEC and local authorities</li>
              <li><strong>Evidence Preservation:</strong> We preserve all relevant evidence for law enforcement</li>
              <li><strong>Full Cooperation:</strong> We fully cooperate with all law enforcement investigations</li>
            </ul>
          </section>

          {/* Section 5: Data Protection */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              5. Data Protection & Privacy Safety
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">5.1 Secure Data Handling</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>Encryption:</strong> All user data is encrypted both in transit and at rest</li>
              <li><strong>Access Controls:</strong> Strict access controls limit who can view user information</li>
              <li><strong>Data Minimization:</strong> We only collect data necessary for platform functionality</li>
              <li><strong>Regular Audits:</strong> Regular security audits ensure data protection compliance</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">5.2 Privacy Protection</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Anonymous Reporting:</strong> Users can report safety concerns anonymously</li>
              <li><strong>Data Retention:</strong> We only retain data as long as necessary for safety and legal purposes</li>
              <li><strong>User Control:</strong> Users have full control over their personal information</li>
            </ul>
          </section>

          {/* Section 6: User Education */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              6. User Education & Safety Resources
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">6.1 Safety Guidelines</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>Profile Safety:</strong> Guidelines for creating safe and appropriate profiles</li>
              <li><strong>Meeting Safety:</strong> Best practices for safe in-person meetings</li>
              <li><strong>Online Safety:</strong> Tips for staying safe while using online platforms</li>
              <li><strong>Recognizing Red Flags:</strong> How to identify and report suspicious behavior</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">6.2 Educational Resources</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Safety Tutorials:</strong> Interactive tutorials on platform safety</li>
              <li><strong>Resource Library:</strong> Comprehensive library of safety resources</li>
              <li><strong>Expert Advice:</strong> Regular safety tips from security experts</li>
            </ul>
          </section>

          {/* Section 7: Compliance */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              7. Compliance & Legal Framework
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">7.1 Regulatory Compliance</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>COPPA Compliance:</strong> Full compliance with Children's Online Privacy Protection Act</li>
              <li><strong>GDPR Compliance:</strong> European General Data Protection Regulation compliance</li>
              <li><strong>NCMEC Partnership:</strong> Active partnership with National Center for Missing & Exploited Children</li>
              <li><strong>Local Laws:</strong> Compliance with all applicable local and international laws</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">7.2 Industry Standards</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Technology Coalition:</strong> Member of the Technology Coalition against child exploitation</li>
              <li><strong>WeProtect Alliance:</strong> Participant in WeProtect Global Alliance initiatives</li>
              <li><strong>Best Practices:</strong> Implementation of industry best practices for child safety</li>
            </ul>
          </section>

          {/* Section 8: Continuous Improvement */}
          <section className="mb-10">
            <h2 className="text-3xl text-blue-600 font-bold mb-6 border-b-4 border-blue-600 pb-2">
              8. Continuous Improvement
            </h2>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">8.1 Regular Updates</h3>
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li><strong>Policy Reviews:</strong> Quarterly reviews of all safety policies and procedures</li>
              <li><strong>Technology Updates:</strong> Regular updates to safety technology and AI systems</li>
              <li><strong>Training Updates:</strong> Ongoing training for our moderation and safety teams</li>
            </ul>
            
            <h3 className="text-2xl text-purple-600 font-bold mb-4">8.2 User Feedback</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>Feedback Collection:</strong> Regular collection of user feedback on safety measures</li>
              <li><strong>Improvement Implementation:</strong> Rapid implementation of safety improvements based on feedback</li>
              <li><strong>Transparency Reports:</strong> Regular publication of safety and transparency reports</li>
            </ul>
          </section>
        </div>

        {/* Emergency Contact Info */}
        <div className="bg-gray-100 p-8 rounded-lg text-center mb-8">
          <h3 className="text-2xl text-blue-600 font-bold mb-6">🆘 Emergency Safety Contact</h3>
          <div className="space-y-2 text-lg">
            <p><strong>24/7 Safety Hotline:</strong> +1-800-SAFETY-1</p>
            <p><strong>Email:</strong> safety@punjabirishtey.com</p>
            <p><strong>Emergency Response:</strong> Available 24/7 for immediate safety concerns</p>
            <p><strong>NCMEC Hotline:</strong> 1-800-THE-LOST (1-800-843-5678)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 border-t pt-6">
          <p className="mb-2"><strong>Last Updated:</strong> January 2025</p>
          <p className="mb-2"><strong>Document Version:</strong> 1.0</p>
          <p>© 2025 Punjabi Rishtey. All rights reserved. | 
            <a href="/privacy-policy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> | 
            <a href="/terms" className="text-blue-600 hover:underline ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyStandards;
