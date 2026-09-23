import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <Badge variant="gold">We are here to help</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-cinzel">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Have feedback, need assistance, or want to suggest a new template design? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-red-950 to-red-900 text-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <h3 className="text-xl font-bold font-cinzel text-amber-200">
              Get in Touch
            </h3>
            <p className="text-xs text-amber-100/80 mt-1 leading-relaxed">
              We respond promptly to user inquiries and feedback regarding biodata templates and features.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-amber-300 mt-0.5" />
              <div>
                <span className="font-semibold block text-amber-200">Support Email</span>
                <span className="text-amber-100/80">support@vivahbio.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-amber-300 mt-0.5" />
              <div>
                <span className="font-semibold block text-amber-200">Community Feedback</span>
                <span className="text-amber-100/80">feedback@vivahbio.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-300 mt-0.5" />
              <div>
                <span className="font-semibold block text-amber-200">Headquarters</span>
                <span className="text-amber-100/80">Bengaluru & Ahmedabad, India</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-red-800/80 text-[11px] text-amber-200/70">
            Available Monday to Saturday, 9:30 AM to 6:30 PM IST.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out, {name}. Our team will review your message and reply via {email} shortly.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                required
                placeholder="Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                required
                placeholder="aarav@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Subject"
                optional
                placeholder="e.g. Question about Gujarati template font or feature suggestion"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <Textarea
                label="Your Message"
                required
                rows={4}
                placeholder="How can we assist you with your matrimonial biodata?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
