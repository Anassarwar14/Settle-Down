import FAQItem from './FAQItem';


const FAQList = () => {
  const faqs = [
    { question: 'What is SettleDown?', answer: 'It is a platform carefully crafted to tailor to your property needs. Whether buying, selling or renting properties, you can conveniently achieve it from the comfort of your home.' },
    { question: 'How can I schedule a property viewing?', answer: 'Choose the property best suited to your needs, sign in and select the "Show Contacts" button in the brief overview on the bottom-right of the listing. This will open a contact landlord form, enter your name and message in the input and an email would be automatically sent to the landlord.' },
    { question: 'What does the purple % icon indicate on a listing?', answer: 'This icon indicates, a particular listing currently has a discount offer.' },
    { question: 'How can I list my property for sale on your website?', answer: 'You can create a listing, simply by navigating to the "My Profile" Page, clicking the create listing option from the listings section and post away. Our user-friendly interface makes you publish a listing in just a few steps.' },
    { question: 'How can I find the best properties in my desired location?', answer: 'In the searchbar, type in the city, state or country you are looking to settle-down into and tadaa! the properties magically start to appear. Additional tip: describe the property to get closer to the perfect fit.' },

  ];

  return (
    <div className="max-w-3xl mx-auto p-4 divide-y divide-purple-500 ">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQList;