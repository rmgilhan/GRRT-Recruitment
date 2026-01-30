const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last Updated: October 2023</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p>In compliance with the <b>Philippine Data Privacy Act of 2012</b>, we collect personal information including but not limited to:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Name, Email, and Phone Number (via Inquiry Form)</li>
          <li>Resumes and Employment History (via Job Applications)</li>
          <li>IP Addresses and Chat Logs (via Tawk.to Live Chat)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
        <p>Your data is used solely for recruitment purposes, including matching you with job openings and communicating with you regarding your application.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Data Retention</h2>
        <p>We retain candidate profiles for up to 2 years unless a request for deletion is made by the data subject.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;