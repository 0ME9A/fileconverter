"use client";
import { MessageSquare, RefreshCw, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

const validateSubject = (subject: string): boolean => {
  return subject.trim().length >= 3 && subject.trim().length <= 100;
};

const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 500;
};

const generateCaptcha = (): { question: string; answer: number } => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
  };
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState<{
    question: string;
    answer: number;
  } | null>(null);

  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be between 2 and 50 characters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validateSubject(formData.subject)) {
      newErrors.subject = "Subject must be between 3 and 100 characters";
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be between 10 and 500 characters";
    }

    if (!captcha || Number.parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = "Incorrect answer. Please try again.";
    }

    if (!acceptedPrivacy) {
      newErrors.privacy =
        "You must accept the privacy policy to send a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      if (!captcha) {
        setErrors({ captcha: "Captcha not ready. Please try again." });
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaAnswer: Number.parseInt(captchaInput),
          captchaExpected: captcha.answer,
          acceptedPrivacy,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setCaptchaInput("");
        setAcceptedPrivacy(false);
        refreshCaptcha();

        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("[v0] Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Send Us a Message</h2>
      </div>

      {submitStatus.type && (
        <div
          className={`border rounded-lg p-4 mb-6 ${
            submitStatus.type === "success"
              ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100"
              : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100"
          }`}
        >
          <div className="flex items-center gap-2">
            {submitStatus.type === "success" ? (
              <Send className="w-5 h-5" />
            ) : (
              <span className="text-xl">⚠️</span>
            )}
            <p className="font-medium">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) {
                setErrors({ ...errors, name: "" });
              }
            }}
            className={errors.name ? "border-red-500" : ""}
            required
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          <p className="text-xs text-muted-foreground">2-50 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) {
                setErrors({ ...errors, email: "" });
              }
            }}
            className={errors.email ? "border-red-500" : ""}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            Subject <span className="text-red-500">*</span>
          </Label>
          <Input
            id="subject"
            type="text"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={(e) => {
              setFormData({ ...formData, subject: e.target.value });
              if (errors.subject) {
                setErrors({ ...errors, subject: "" });
              }
            }}
            className={errors.subject ? "border-red-500" : ""}
            required
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject}</p>
          )}
          <p className="text-xs text-muted-foreground">3-100 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us more..."
            rows={6}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) {
                setErrors({ ...errors, message: "" });
              }
            }}
            className={errors.message ? "border-red-500" : ""}
            required
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {formData.message.length}/500 characters (min: 10)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="captcha">
            Verify you&apos;re human <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-muted px-4 py-2 rounded-lg font-mono text-lg font-semibold">
                  {captcha ? `${captcha.question} = ?` : "Loading..."}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={refreshCaptcha}
                  className="h-9 w-9"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <Input
                id="captcha"
                type="number"
                placeholder="Your answer"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  if (errors.captcha) {
                    setErrors({ ...errors, captcha: "" });
                  }
                }}
                className={errors.captcha ? "border-red-500" : ""}
                required
              />
            </div>
          </div>
          {errors.captcha && (
            <p className="text-sm text-red-500">{errors.captcha}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={acceptedPrivacy}
              onCheckedChange={(checked) => {
                setAcceptedPrivacy(checked === true);
                if (errors.privacy) {
                  setErrors({ ...errors, privacy: "" });
                }
              }}
              className={errors.privacy ? "border-red-500" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I accept the privacy policy{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          {errors.privacy && (
            <p className="text-sm text-red-500">{errors.privacy}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
