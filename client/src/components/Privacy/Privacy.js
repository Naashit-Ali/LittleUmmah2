import React from 'react';
import styles from './Privacy.module.scss';

const Privacy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Privacy Policy for Islamic E-Learning Quiz Game</h1>
        <p>Welcome to the Islamic E-Learning Quiz Game ("the App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.</p>
        
        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>We collect personal information that you voluntarily provide to us when registering within the App, such as:</p>
        <ul>
          <li>Username</li>
          <li>Password</li>
        </ul>

        <h3>Non-Personal Information</h3>
        <p>We may also collect non-personal information that does not identify you specifically, such as:</p>
        <ul>
          <li>Device Information: Information about your mobile device, including model, operating system, and device identifiers.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect in the following ways:</p>
        <h3>To Provide and Maintain the Service</h3>
        <ul>
          <li>Account Creation and Management: To create and manage user accounts.</li>
          <li>Content Delivery: To deliver educational content and quizzes.</li>
        </ul>

        <h3>To Improve and Customize the Service</h3>
        <ul>
          <li>Analytics: To analyze usage patterns and improve the App's functionality and user experience.</li>
        </ul>

        <h2>Information Sharing and Disclosure</h2>
        <p>We do not share your personal information with third parties except in the following circumstances:</p>
        <h3>Legal Requirements</h3>
        <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
        <h3>Business Transfers</h3>
        <p>In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our App of any change in ownership or use of your personal information.</p>

        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee the absolute security of your data.</p>

        <h2>Children's Privacy</h2>
        <p>Our App is intended for children aged 7-15. We are committed to protecting the privacy of children and comply with applicable laws and regulations, such as the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect personal information from children under 13 without parental consent. If we learn that we have collected personal information from a child under 13 without verification of parental consent, we will delete that information promptly. If you believe we might have any information from or about a child under 13, please contact us.</p>

        <h2>Your Rights and Choices</h2>
        <p>You have the following rights regarding your personal information:</p>
        <h3>Access and Correction</h3>
        <p>You can access and update your personal information by logging into your account settings.</p>
        <h3>Deletion</h3>
        <p>You can request the deletion of your personal information by contacting us. We will comply with your request to the extent required by applicable law.</p>
        <p>Online Account Deletion: Alternatively, you can visit here to delete your account yourself.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date. You are advised to review this privacy policy periodically for any changes. Your continued use of the App after any modifications to the privacy policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the revised policy.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at:</p>
        <p>Email: 20B-035-SE@students.uit.edu</p>
        <p>Last Updated: May 27, 2024</p>
      </div>
    </div>
  );
};

export default Privacy;
