"use client"
import React, { useTransition } from "react";
import { submitForm } from "./actions";

const CreateButton = () => {
  const [pending, setPending] = useTransition();

  const formData = new FormData();
  return (
    <button
      onClick={() => setPending(() => submitForm(formData))}
      className="btn"
    >
      {pending ? "Creating..." : "Submit"}
    </button>
  );
};

export default CreateButton;
