import React, { useState } from "react";
import images from "./../../assets/assets";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
  };

  return (
    <div
      id="contact-us"
      className=" mb-[5%] border-1 flex space-x-1 justify-between items-start bg-whiteBlueColor mt-20 border-4 border-white rounded-3xl"
    >
      {/* Contact information */}
      <div  className="w-[50%] h-[90%] flex flex-col space-y-3 p-2">
        <p className="font-bold p-4 text-2xl">Contact information</p>
        <div className="flex justify-start items-center p-2">
          <img src={images.locationIcon} alt="Location Icon" className="p-2" />
          <p className="text-xl font-bold">Our location</p>
        </div>
        <p className="ml-4">Constantine, University of Abdelhamid Mehri.</p>
        <div className="flex justify-start items-center p-2">
          <img src={images.mailIcon} alt="Mail Icon" className="p-2" />
          <p className="text-xl font-bold">Email</p>
        </div>
        <p className="ml-4">KidzDraw@gmail.com</p>
      </div>
      {/* Send us a message */}
      <div className="w-[50%] h-[90%] border-2 flex flex-col space-y-2 p-2">
        <p className="font-bold p-4 text-2xl">Send us a Message</p>
        <form className='flex flex-col space-y-4'>
            <div className=" flex flex-col  space-y-1">
              <label htmlFor="name" className="p-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                className="w-[90%] border rounded-md p-2 bg-blueGray"
                required
              />
            </div>
            <div className="flex flex-col  space-y-1">
              <label htmlFor="email" className="p-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your Email '
                value={formData.email}
                onChange={handleChange}
                className="w-[90%] border rounded-md p-2 bg-blueGray"
                required
              />
            </div>
            <div className="flex flex-col  space-y-1">
              <label htmlFor="message" className="p-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-[90%]  border rounded-md p-2 bg-blueGray"
                placeholder='Enter your message'
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-[90%] text-white rounded-md p-2 bg-gray-gradiant"
            >
              send Message
            </button>
          </form>
      </div>
    </div>
  );
};

export default ContactUsSection;
