import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { supabase } from '../supabaseClient';
import {
  Sparkles,
  HelpCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t, language } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const title = t('seo.contact.title', 'Contact Us | Active Soft');
    const description = t('seo.contact.description', 'Get in touch with Active Soft for a free consultation on your next project.');
    const keywords = t('seo.contact.keywords', 'Contact Active Soft, Request a Demo, Free Consultation, Technology Solutions, Cairo Egypt');

    if (title) document.title = title;

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
  }, [t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (error) throw error;

      setSubmitStatus('success');
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = t('contact.faq', { title: '', subtitle: '', questions: [] });

  // Custom glowing futuristic input styling classes
  const inputClasses = "w-full px-4 py-3.5 bg-slate-950/60 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-white placeholder-gray-400 text-sm";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070714] text-white">
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Technical schematics */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h120v120H0z' fill='none'/%3E%3Cpath d='M0 60h24m24 0h12m24 0h36M60 0v24m0 24v12m0 24v36' stroke='%2306B6D4' stroke-width='1'/%3E%3Ccircle cx='24' cy='60' r='2' fill='%2306B6D4'/%3E%3Ccircle cx='60' cy='24' r='2' fill='%2306B6D4'/%3E%3Ccircle cx='60' cy='96' r='2' fill='%2306B6D4'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>{language === 'ar' ? 'تواصل معنا على مدار الساعة' : 'Always Ready to Consult'}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
              {t('contact.title', 'Contact Our Team')}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('contact.subtitle', 'Let us discuss how our tailored ERP systems and technical capabilities can support your enterprise.')}
            </p>
          </div>

          {/* FAQ Section */}
          {faqData && faqData.questions && faqData.questions.length > 0 && (
            <section className="max-w-4xl mx-auto mb-20">
              <div className="text-center mb-12 animate-on-scroll">
                <div className="inline-flex items-center gap-2 text-primary font-display font-semibold mb-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>{faqData.title || (language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions')}</span>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto text-sm">
                  {faqData.subtitle || (language === 'ar' ? 'إليك إجابات سريعة على أهم استفسارات عملائنا.' : 'Clear answers to direct client questions regarding deployment times, cost, and integrations.')}
                </p>
              </div>

              <div className="space-y-4 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                {faqData.questions.map((item: { q: string, a: string }, index: number) => (
                  <div
                    key={index}
                    className="glass-panel rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <button
                      onClick={() => handleFaqToggle(index)}
                      className="w-full flex justify-between items-center text-start p-6 focus:outline-none"
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="font-bold text-white text-sm md:text-base">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === index ? 'rotate-180 text-primary' : ''
                          }`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: openFaqIndex === index ? '200px' : '0' }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-300 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Form and Contact details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">

            {/* Info Cards Column */}
            <div className="space-y-6 flex flex-col justify-between h-full animate-on-scroll">

              {/* Phone Card */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'اتصل بنا مباشرة:' : 'Call Us:'}
                  </h4>
                  <p className="text-white font-bold font-mono text-sm leading-none" dir="ltr">
                    +20 122 507 7433
                  </p>
                  <br></br>
                  <p className="text-white font-bold font-mono text-sm leading-none" dir="ltr">
                    +20 100 646 7081
                  </p>
                </div>
              </div>

              {/* Mail Card */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                  </h4>
                  <p className="text-white font-bold text-sm leading-none">
                    info@activesoft.net
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'المقر الرئيسي:' : 'Our Location:'}
                  </h4>
                  <p className="text-white text-xs leading-relaxed">
                    {language === 'ar'
                      ? 'مول الجامعة , مدينة السادات , المنوفية , مصر'
                      : 'Elgamaa mall , Sadat City , Monoufia , Egypt'}
                  </p>
                </div>
              </div>

            </div>

            {/* Glowing Message Form */}
            <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                {/* Success Banner */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-sm font-semibold animate-pulse">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{t('contact.successMessage', 'Thank you for your message! We will get back to you shortly.')}</span>
                  </div>
                )}

                {/* Error Banner */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-semibold">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t('contact.errorMessage', 'Something went wrong. Please try again.')}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{t('contact.nameLabel', 'Full Name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t('contact.namePlaceholder', 'Your Name')}
                      required
                      disabled={isSubmitting}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{t('contact.emailLabel', 'Email address')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('contact.emailPlaceholder', 'Your Email')}
                      required
                      disabled={isSubmitting}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{t('contact.subjectLabel', 'Subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder={t('contact.subjectPlaceholder', 'How can we help?')}
                    required
                    disabled={isSubmitting}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{t('contact.messageLabel', 'Message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t('contact.messagePlaceholder', 'Tell us more about your project needs...')}
                    required
                    disabled={isSubmitting}
                    className={inputClasses}
                  ></textarea>
                </div>

                <div className="text-center md:text-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm"
                  >
                    <span>
                      {isSubmitting ? t('contact.submittingButton', 'Sending message...') : t('contact.submitButton', 'Send Message')}
                    </span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;