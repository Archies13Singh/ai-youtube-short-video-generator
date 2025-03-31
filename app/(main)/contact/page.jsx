"use client";
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { MagicCard } from "../../../components/ui/magic-card";
import { useTheme } from "next-themes";
import { Button } from "../../../components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({});
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  useEffect(() => {
    if (submitStatus.message) {
      setShow(true);
      setAnimateOut(false);

      const timer = setTimeout(() => {
        setAnimateOut(true); // Start slide-out animation
        setTimeout(() => setShow(false), 500); // Hide after animation completes
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // Replace these with your actual EmailJS service, template, and user IDs
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILSJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILSJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "Archies",
          from_email: formData.email,
          to_email: "archiessingh04@gmail.com",
          message: formData.message,
          from_website: "VideoGeine",
        },
        process.env.NEXT_PUBLIC_EMAILSJS_PUBLIC_KEY
      );

      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2 order-last md:order-first">
        <h1 className="text-5xl text-center mb-5">Contact Us</h1>
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="rounded-lg"
        >
          <form
            className="bg-transparent p-6 rounded-lg shadow-sm w-full"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-1.5 font-medium text-white text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-1.5 font-medium text-white text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-1.5 font-medium text-white text-sm"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border ${errors.message ? "border-red-500" : "border-gray-700"} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors min-h-[120px] resize-y`}
                placeholder="Your message"
                rows={5}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {show && (
              <div
                className={`fixed top-5 right-5 p-3 rounded-md text-center shadow-lg transition-transform duration-500 ease-in-out ${
                  animateOut
                    ? "translate-x-[100%] opacity-0"
                    : "translate-x-0 opacity-100"
                } ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                className="max-w-[200px] bg-[#7b2cbf] hover:bg-[#EFA6DC] text-white hover:text-black hover:font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </MagicCard>
      </div>

      <div className="md:col-span-1 order-first md:order-last hidden md:block">
        <DotLottieReact
          src="https://lottie.host/2c6c4954-7a00-4b2b-ad58-11b4d6494bfb/id8pAlz50T.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Contact;
