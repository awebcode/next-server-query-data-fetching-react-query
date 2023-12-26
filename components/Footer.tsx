import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto fixed bottom-0 inset-x-0">
      {" "}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-gray-800 text-sm">
          &copy; {new Date().getFullYear()} Asikur - All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;
