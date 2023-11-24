// PrivacyPolicy.jsx
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Privacy Policy
          </h2>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              What information do we collect?
            </h3>
            <p className="text-gray-800">
              We collect information from you when you register on our site,
              place an order, subscribe to our newsletter, respond to a survey,
              or fill out a form.
            </p>
            <p className="text-gray-800">
              When ordering or registering on our site, as appropriate, you may
              be asked to enter your: name, e-mail address, mailing address, or
              phone number. You may, however, visit our site anonymously.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              What do we use your information for?
            </h3>
            <ul className="list-disc pl-6 text-gray-800">
              <li className="mb-2">
                To personalize your experience (your information helps us to
                better respond to your individual needs)
              </li>
              <li className="mb-2">
                To improve our website (we continually strive to improve our
                website offerings based on the information and feedback we
                receive from you)
              </li>
              <li className="mb-2">
                To improve customer service (your information helps us to more
                effectively respond to your customer service requests and
                support needs)
              </li>
              <li className="mb-2">
                To process transactions: Your information, whether public or
                private, will not be sold, exchanged, transferred, or given to
                any other company for any reason whatsoever, without your
                consent, other than for the express purpose of delivering the
                purchased product or service requested.
              </li>
              <li className="mb-2">
                To administer a contest, promotion, survey, or other site
                feature
              </li>
              <li className="mb-2">
                To send periodic emails: The email address you provide for order
                processing may be used to send you information and updates
                pertaining to your order, in addition to receiving occasional
                company news, updates, related product or service information,
                etc.
              </li>
            </ul>
          </section>

          {/* Continue adding the rest of your privacy policy content */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
