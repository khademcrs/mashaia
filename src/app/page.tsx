"use client";

import { useEffect, useState, FormEvent } from "react";
import MashayaLogo from "@/components/MashayaLogo";
import SecondaryLogo from "@/components/SecondaryLogo";



export default function Home() {


  const [moukebs, setMoukebs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // dynamic services moved to state

  const getServiceIcon = (name: string) => {
    if (name.includes("مياه")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"></rect><text x="12" y="16" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">WC</text></svg>;
    if (name.includes("مبيت")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>;
    if (name.includes("ضيافة")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
    if (name.includes("غسيل") || name.includes("غسل")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>;
    if (name.includes("طبية") || name.includes("علاج")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
    if (name.includes("مفقودين")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
    if (name.includes("اتصالات")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
    if (name.includes("استفتاءات")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
    if (name.includes("صيانة") || name.includes("تصليح")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
    if (name.includes("خياطة")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>;
    if (name.includes("شحن") || name.includes("هواتف")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline></svg>;
    if (name.includes("إنترنت") || name.includes("انترنت")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>;

    if (name.includes("موكب") || name.includes("حسينية") || name.includes("نقطة") || name.includes("مضيف") || name.includes("مخيم") || name.includes("مسجد") || name.includes("جامع")) {
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>;
    }

    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>;
  };

  const [pendingMoukebs, setPendingMoukebs] = useState<any[]>([]);
  const [archivedPending, setArchivedPending] = useState<any[]>([]);
  const [pendingTab, setPendingTab] = useState<"new" | "archived">("new");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reports State
  const [reports, setReports] = useState<any[]>([]);
  const [archivedReports, setArchivedReports] = useState<any[]>([]);
  const [reportsTab, setReportsTab] = useState<"new" | "archived">("new");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportColumn, setReportColumn] = useState<number | null>(null);
  const [reportType, setReportType] = useState("اسم الموكب");
  const [reportText, setReportText] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [showReportToast, setShowReportToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [availableServices, setAvailableServices] = useState(["دورات مياه", "مبيت", "ضيافة وطعام", "غسيل ملابس"]);
  const [newServiceInput, setNewServiceInput] = useState("");
  const [formMoukebServices, setFormMoukebServices] = useState<string[]>([]);
  const [formOtherServices, setFormOtherServices] = useState("");

  const handleToggleService = (srv: string) => {
    if (formMoukebServices.includes(srv)) {
      setFormMoukebServices(formMoukebServices.filter(s => s !== srv));
    } else {
      setFormMoukebServices([...formMoukebServices, srv]);
    }
  };

  const handleAddNewService = () => {
    const trimmed = newServiceInput.trim();
    if (trimmed && !availableServices.includes(trimmed)) {
      setAvailableServices([...availableServices, trimmed]);
      setFormMoukebServices([...formMoukebServices, trimmed]);
      setNewServiceInput("");
    }
  };

  const [formColumn, setFormColumn] = useState("");
  const [formNames, setFormNames] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formNote, setFormNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Admin State
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminView, setAdminView] = useState<'main' | 'columns' | 'pending' | 'services' | 'reports'>('main');
  const [knownServices, setKnownServices] = useState<Record<string, string[]>>({
    "خدمات أساسية": ["مبيت", "ضيافة وطعام", "دورات مياه"],
    "دعم وطوارئ": ["مفرزة طبية", "علاج طبيعي", "مركز المفقودين", "استفتاءات شرعية"],
    "خدمات تقنية وغيرها": ["شحن هواتف", "إنترنت مجاني", "مركز اتصالات", "صيانة وتصليح", "مفرزة خياطة", "غسيل ملابس"]
  });
  const allKnownServices = Array.from(new Set(Object.values(knownServices).flat()));
  const PREDEFINED_SERVICES = ['مبيت', 'ضيافة وطعام', 'دورات مياه', 'مفرزة طبية', 'علاج طبيعي', 'مركز المفقودين', 'استفتاءات شرعية', 'شحن هواتف', 'إنترنت مجاني', 'مركز اتصالات', 'صيانة وتصليح', 'مفرزة خياطة', 'غسيل ملابس'];




  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMoukeb, setEditingMoukeb] = useState<{
    column: number,
    index: number,
    name: string,
    services: string[],
    country?: string,
    originalData: any // Keep the whole col data to send back
  } | null>(null);

  // Expanded Column
  const [expandedCol, setExpandedCol] = useState<number | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);


  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        setKnownServices(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoukebs();
    fetchServices();

    const savedSession = localStorage.getItem("adminSession");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setIsAdmin(true);
        setAdminPassword(parsed.password);
      } catch(e) {}
    }


    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/reports?includeArchived=true&adminPassword=${adminPassword}`, {
        headers: { "X-Admin-Password": adminPassword }, cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data.active || data);
        setArchivedReports(data.archived || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReports();
    }
  }, [isAdmin]);

  const fetchPendingMoukebs = async () => {
    try {
      const res = await fetch(`/api/moukebs/pending?adminPassword=${adminPassword}`, {
        headers: { "X-Admin-Password": adminPassword }, cache: "no-store"
      });
      if (res.ok) {
        setPendingMoukebs(await res.json());
      }

      const resArchived = await fetch(`/api/moukebs/pending?includeArchived=true&adminPassword=${adminPassword}`, {
        headers: { "X-Admin-Password": adminPassword }, cache: "no-store"
      });
      if (resArchived.ok) {
        const data = await resArchived.json();
        setArchivedPending(data.archived || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPendingMoukebs();
    }
  }, [isAdmin]);

  const fetchMoukebs = async () => {
    try {
      const res = await fetch(`/api/moukebs?adminPassword=${adminPassword}`, { cache: "no-store" });
      const data = await res.json();
      setMoukebs(data);
    } catch (err) {
      console.error("Failed to fetch moukebs", err);
    }
  };

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    setLastClickTime(now);

    if (clickCount + 1 >= 7) {
      setShowLoginModal(true);
      setClickCount(0);
    }
  };

    const handleLogout = () => {
    setIsAdmin(false);
    setAdminPassword("");
    setAdminView('main');
    setIsPreviewMode(false);
    localStorage.removeItem("adminSession");
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPassword === "kmnt" || adminPassword === "kadm313") {
      setIsAdmin(true);
      setShowLoginModal(false);
      localStorage.setItem("adminSession", JSON.stringify({ password: adminPassword }));
      alert("تم تسجيل الدخول بنجاح.");
    } else {
      alert("كلمة المرور غير صحيحة.");
    }
  };


  const handleReportSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isOnline) {
      alert("عذراً، يجب توفر اتصال بالإنترنت لإرسال ملاحظات، يرجى المحاولة لاحقاً");
      return;
    }
    if (!reportColumn || !reportText) return;

    setIsSubmittingReport(true);
    try {
      const res = await fetch(`/api/reports?adminPassword=${adminPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          column: reportColumn,
          type: "ملاحظة",
          text: reportText
        })
      });

      if (res.ok) {
        setReportModalOpen(false);
        setReportText("");
        setShowReportToast(true);
        setTimeout(() => setShowReportToast(false), 5000);
        fetchReports();
      } else {
        alert("حدث خطأ أثناء إرسال البلاغ.");
      }
    } catch (err) {
      alert("حدث خطأ.");
    }
    setIsSubmittingReport(false);
  };

  const handleIgnoreReport = async (id: string) => {
    if (!confirm("هل أنت متأكد من تجاهل وحذف هذا التعديل المقترح؟")) return;
    try {
      const res = await fetch(`/api/reports?adminPassword=${adminPassword}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Password": adminPassword },
        body: JSON.stringify({ id, action: 'ignore' }),
        cache: "no-store"
      });
      if (res.ok) {
        fetchReports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveReport = async (reportId: string) => {
    try {
      const res = await fetch(`/api/reports?adminPassword=${adminPassword}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Password": adminPassword },
        body: JSON.stringify({ id: reportId, action: 'approve' }),
        cache: "no-store"
      });
      if (res.ok) {
        fetchReports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMoukeb = async (e: FormEvent) => {
    e.preventDefault();
    if (!formColumn) return;

    let allServices = [...formMoukebServices];
    if (formOtherServices.trim()) {
      allServices.push(formOtherServices.trim());
    }

    let finalName = formNames.trim();
    if (!finalName) {
      if (allServices.length > 0) {
        finalName = "نقطة " + allServices[0];
      } else {
        alert("الرجاء إدخال اسم الموكب أو اختيار خدمة واحدة على الأقل.");
        return;
      }
    }

    const finalNote = allServices.length > 0 ? "الخدمات: " + allServices.join("، ") : "";

    setIsSubmitting(true);
    try {
      const payload = {
        column: parseInt(formColumn),
        names: [finalName],
        country: formCountry,
        note: finalNote
      };

      const endpoint = "/api/moukebs/pending";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isAdmin ? { "X-Admin-Password": adminPassword } : {})
        },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json();
      if (res.ok) {
        setFormColumn("");
        setFormNames("");
        setFormCountry("");
        setFormOtherServices("");
        setFormMoukebServices([]);
        setAddStep(3); // Go to success screen

        if (isAdmin) {
          fetchPendingMoukebs();
          fetchMoukebs();
        }
      } else {
        alert("حدث خطأ أثناء إضافة الخدمة.");
      }
    } catch (err) {
      alert("حدث خطأ.");
    }
    setIsSubmitting(false);
  };




  const handleApprovePending = async (id: string) => {
    try {
      const pendingMoukeb = pendingMoukebs.find(m => m.id === id);
      if (!pendingMoukeb) return;

      const addRes = await fetch(`/api/moukebs?adminPassword=${adminPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": adminPassword },
        body: JSON.stringify({
          column: pendingMoukeb.column,
          names: pendingMoukeb.names,
          country: pendingMoukeb.country,
          note: pendingMoukeb.note
        })
      });

      if (!addRes.ok) throw new Error("Failed to add to moukebs");

      const res = await fetch(`/api/moukebs/pending?adminPassword=${adminPassword}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Password": adminPassword },
        body: JSON.stringify({ id, action: 'approve' }),
        cache: "no-store"
      });
      if (res.ok) {
        alert("تم اعتماد الموكب وإضافته للموقع بنجاح!");
        fetchPendingMoukebs();
        fetchMoukebs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectPending = async (id: string) => {
    if (!confirm("هل أنت متأكد من رفض هذا الطلب وحذفه نهائياً؟")) return;
    try {
      const res = await fetch(`/api/moukebs/pending?adminPassword=${adminPassword}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Admin-Password": adminPassword },
        body: JSON.stringify({ id, action: 'reject' }),
        cache: "no-store"
      });
      if (res.ok) {
        fetchPendingMoukebs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (column: number) => {
    if (!confirm(`هل أنت متأكد من حذف العمود رقم ${column} بالكامل؟`)) return;

    try {
      const res = await fetch(`/api/moukebs?adminPassword=${adminPassword}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": adminPassword
        },
        body: JSON.stringify({ column })
      });
      if (res.ok) {
        alert("تم حذف الموكب بنجاح!");
        setExpandedCol(null);
        fetchMoukebs();
      } else {
        alert("خطأ في الحذف. تأكد من الصلاحيات.");
      }
    } catch (err) {
      alert("حدث خطأ أثناء الحذف.");
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingMoukeb) return;

    setIsSubmitting(true);

    const { originalData, index, name, services } = editingMoukeb;

    let finalName = name;
    if (!finalName && services.length === 1 && allKnownServices.includes(services[0])) {
      finalName = services[0];
    } else if (!finalName) {
      finalName = "موكب أو حسينية";
    }

    const newNames = [...originalData.names];
    newNames[index] = finalName;

    const newNotes = originalData.note ? originalData.note.split(' - ') : [];
    while (newNotes.length < originalData.names.length) {
      newNotes.push('');
    }

    const serviceString = services.filter(s => s !== finalName).join('،');
    newNotes[index] = serviceString ? `الخدمات: ${serviceString}` : '';

    const updatedNote = newNotes.join(' - ').replace(/ - $/, '');

    try {
      const res = await fetch(`/api/moukebs?adminPassword=${adminPassword}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": adminPassword
        },
        body: JSON.stringify({
          column: originalData.column,
          names: newNames,
          country: editingMoukeb.country,
          note: updatedNote
        })
      });
      if (res.ok) {
        setIsEditModalOpen(false);
        setEditingMoukeb(null);
        fetchMoukebs();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`خطأ في تحديث البيانات: ${errorData.error || res.status}`);
      }
    } catch (err) {
      alert(`حدث خطأ أثناء التحديث: ${(err as Error).message || "Unknown error"}`);
    }
    setIsSubmitting(false);
  };

  const handleDeleteMoukebFromColumn = async (col: any, index: number) => {
    if (!confirm(`هل أنت متأكد من حذف ${col.names[index]}؟`)) return;

    if (col.names.length === 1) {
      handleDelete(col.column);
      return;
    }

    const updatedNames = [...col.names];
    updatedNames.splice(index, 1);

    const notesParts = col.note ? col.note.split(' - ') : [];
    while (notesParts.length < col.names.length) {
      notesParts.push('');
    }
    notesParts.splice(index, 1);
    const updatedNote = notesParts.join(' - ').replace(/ - $/, '');

    try {
      const res = await fetch(`/api/moukebs?adminPassword=${adminPassword}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": adminPassword
        },
        body: JSON.stringify({
          column: col.column,
          names: updatedNames,
          country: col.country,
          note: updatedNote
        })
      });
      if (res.ok) {
        fetchMoukebs();
      } else {
        alert("خطأ في الحذف.");
      }
    } catch (err) {
      alert("حدث خطأ.");
    }
  };


  const openEditModal = (col: any, index: number) => {
    let name = col.names[index] || "";
    let services: string[] = [];

    if (col.note) {
      const parts = col.note.split(' - ');
      if (parts[index]) {
        services = parts[index].replace('الخدمات:', '').trim().split('،').map((s: string) => s.trim()).filter((s: string) => s);
      }
    }

    if (allKnownServices.includes(name)) {
      if (!services.includes(name)) {
        services.push(name);
      }
      name = "";
    }

    setEditingMoukeb({
      column: col.column,
      index,
      name,
      services,
      country: col.country,
      originalData: col
    });
    setIsEditModalOpen(true);
  };

  // Filter Moukebs
  const filteredMoukebs = moukebs.filter(col => {
    // text search
    let matchesSearch = true;
    if (search) {
      const q = search.toLowerCase();
      matchesSearch = col.column.toString().includes(q) || col.names.some((n: string) => n.toLowerCase().includes(q));
    }

    // category filter
    let matchesFilter = true;
    if (selectedFilters.length > 0) {
      matchesFilter = selectedFilters.every(ft => {
        if (ft === "موكب أو حسينية") {
          return col.names.some((n: string) => !allKnownServices.includes(n));
        } else {
          return col.names.includes(ft) || (!!col.note && col.note.includes(ft));
        }
      });
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.column - b.column);

  const effectiveIsAdmin = isAdmin && !isPreviewMode;

  return (
    <div>
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top">
          <div className="brand-identity">
            <MashayaLogo className="brand-logo" onClick={handleLogoClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>مَشّاية</h1>
              <SecondaryLogo className="secondary-logo" />
            </div>
          </div>
          <div id="language-switcher" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>

            {isAdmin && !isPreviewMode ? (
              <>
                <button
                  className="primary-btn-outline"
                  onClick={handleLogout}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', borderRadius: '50%',
                    width: '40px', height: '40px', minWidth: '40px', transition: 'all 0.3s ease', overflow: 'hidden', color: 'white', border: '1px solid white'
                  }}
                  title="تسجيل الخروج"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </button>
                <button
                  className="primary-btn-outline"
                  onClick={() => setIsPreviewMode(true)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', borderRadius: '50%',
                    width: '40px', height: '40px', minWidth: '40px', transition: 'all 0.3s ease', overflow: 'hidden', color: 'white', border: '1px solid white'
                  }}
                  title="معاينة وضع الزائر"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <span
                  style={{
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', borderRadius: '50%',
                    width: '40px', height: '40px', minWidth: '40px', transition: 'all 0.3s ease', overflow: 'hidden', border: '1px solid white'
                  }}
                  title="لوحة التحكم"
                >
                  <svg width="20" height="20" viewBox="0 0 86.1 68.1" fill="white">
                    <path d="M75.2,12.8l-16.3,15.4c-.6.6-.9,1.3-.9,2.1l-.2,13.5h5.2c0,0,.2-12.5.2-12.5l6.7-6.3-3.8,26h-11.3l-.2-20c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9l.2,24.3c0,.5.4.9.9.9h22.2c.5,0,.9-.4.9-.9v-3.4c0-.5-.4-.9-.9-.9h-1.4l5.5-37.5c.1-.8-.9-1.3-1.5-.8Z" />
                    <path d="M38.8,30.4c-3.6,0-6.5,2.9-6.5,6.5v.3c0,.5.4.9.9.9h3.4c.5,0,.9-.4.9-.9v-.3c0-.7.6-1.3,1.3-1.3h2.1v15.5c0,0-3.4,0-3.4,0v-6.4c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9v10.7c0,.5.4.9.9.9h12.1c.5,0,.9-.4.9-.9v-24.1c-.1-.5-.5-.9-1-.9h-6.3Z" />
                    <path d="M15.9,51.1h-1.8c-.5,0-.9.4-.9.9v3.4c0,.5.4.9.9.9h14.6c.5,0,.9-.4.9-.9v-24.9c0-.9-.4-1.7-1-2.3L11.4,13c-.6-.5-1.6,0-1.5.8l6,37.3ZM24.4,31.4v19.7h-3.3l-4.2-26.3,7.5,6.6Z" />
                    <path d="M56.9,23.3h0c1.7,0,3-1.4,3-3.1h0s0,0,0,0c0-1.7-1.4-3-3.1-3h0c-1.7,0-3,1.4-3,3.1h0s0,0,0,0c0,1.7,1.4,3,3.1,3h0Z" />
                  </svg>
                </span>
                <button
                  className="primary-btn-outline"
                  onClick={() => { setAddStep(1); setIsModalOpen(true); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', borderRadius: '50%',
                    width: '40px', height: '40px', minWidth: '40px', transition: 'all 0.3s ease', overflow: 'hidden', color: 'white', border: '1px solid white'
                  }}
                  title="أضف خدمة"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </>
            ) : (
              <>
                {isAdmin && isPreviewMode && (
                  <button
                    className="primary-btn-outline"
                    onClick={() => setIsPreviewMode(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', borderRadius: '50%',
                      width: '40px', height: '40px', minWidth: '40px', transition: 'all 0.3s ease', overflow: 'hidden', color: 'white', border: '1px solid white'
                    }}
                    title="الرجوع للوحة التحكم"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </button>
                )}
                <button
                  className="primary-btn-outline"
                  onClick={() => { setAddStep(1); setIsModalOpen(true); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: isScrolled ? '0' : '0.4rem',
                    padding: isScrolled ? '0' : '0.4rem 0.8rem',
                    borderRadius: isScrolled ? '50%' : '10px',
                    width: isScrolled ? '40px' : 'auto',
                    height: isScrolled ? '40px' : 'auto',
                    minWidth: isScrolled ? '40px' : 'auto',
                    transition: 'all 0.3s ease', overflow: 'hidden', whiteSpace: 'nowrap'
                  }}
                  title="أضف خدمة"
                >
                  {isScrolled ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                  ) : (
                    <span>+ أضف خدمة</span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {!isOnline && (
          <div style={{ background: '#ff4444', color: 'white', textAlign: 'center', padding: '0.6rem', fontSize: '0.9rem', fontWeight: 'bold', zIndex: 100, position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            أنت تتصفح الموقع حالياً بدون إنترنت (وضع الأوفلاين)
          </div>
        )}
        {/* Hero Section */}
        <section className="hero-section" style={{ display: (!effectiveIsAdmin || adminView === 'main') ? 'flex' : 'none' }}>
          {effectiveIsAdmin ? (
            <div className="admin-hero-container">
              <div className="admin-hero-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.1 68.1" style={{ width: "100%", height: "100%" }} fill="#ff0000">
                  <path d="M75.2,12.8l-16.3,15.4c-.6.6-.9,1.3-.9,2.1l-.2,13.5h5.2c0,0,.2-12.5.2-12.5l6.7-6.3-3.8,26h-11.3l-.2-20c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9l.2,24.3c0,.5.4.9.9.9h22.2c.5,0,.9-.4.9-.9v-3.4c0-.5-.4-.9-.9-.9h-1.4l5.5-37.5c.1-.8-.9-1.3-1.5-.8Z" />
                  <path d="M38.8,30.4c-3.6,0-6.5,2.9-6.5,6.5v.3c0,.5.4.9.9.9h3.4c.5,0,.9-.4.9-.9v-.3c0-.7.6-1.3,1.3-1.3h2.1v15.5c0,0-3.4,0-3.4,0v-6.4c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9v10.7c0,.5.4.9.9.9h12.1c.5,0,.9-.4.9-.9v-24.1c-.1-.5-.5-.9-1-.9h-6.3Z" />
                  <path d="M15.9,51.1h-1.8c-.5,0-.9.4-.9.9v3.4c0,.5.4.9.9.9h14.6c.5,0,.9-.4.9-.9v-24.9c0-.9-.4-1.7-1-2.3L11.4,13c-.6-.5-1.6,0-1.5.8l6,37.3ZM24.4,31.4v19.7h-3.3l-4.2-26.3,7.5,6.6Z" />
                  <path d="M56.9,23.3h0c1.7,0,3-1.4,3-3.1h0s0,0,0,0c0-1.7-1.4-3-3.1-3h0c-1.7,0-3,1.4-3,3.1h0s0,0,0,0c0,1.7,1.4,3,3.1,3h0Z" />
                </svg>
              </div>
              <h2 className="admin-hero-title">شرفُ الخادم.. نسبُه إلى مولاه</h2>
              <div className="admin-hero-text">
                يا خادم الحسين.. دقةُ المراجعةِ جزءٌ من شرفِ الخدمة. دَقِّقْ في مساهماتِ الخدام، واعتمدْ منها ما يُعينُ الزائرَ في مَسيرِه، لتكونَ خُطواتهم في ميزانِ حسناتِك
              </div>
            </div>
          ) : (
            <>
              <MashayaLogo className="hero-logo" gradient={true} />
              <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>مَشّاية</h2>
              <p>دليلك الميداني على طريق العشق. ابحث عن الأعمدة، المواكب، والخدمات لتيسير مسيرك نحو كربلاء.</p>
            </>
          )}
        </section>

        {effectiveIsAdmin && adminView === 'main' && (
          <div className="admin-cards-container">
              <div className="glass admin-nav-card" onClick={() => setAdminView('columns')}>
                <div className="admin-nav-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="4" rx="1" /><rect x="4" y="18" width="16" height="4" rx="1" /><path d="M7 6v12" /><path d="M12 6v12" /><path d="M17 6v12" /></svg>
                </div>
                <h3>إدارة الأعمدة</h3>
                <p>التحكم الكامل بأعمدة طريق المشاية والمواكب الموجودة بها.</p>
              </div>

            <div className="glass admin-nav-card" onClick={() => setAdminView('pending')}>
              {pendingMoukebs.length > 0 && (
                <div className="admin-badge">
                  {pendingMoukebs.length}
                </div>
              )}
              <div className="admin-nav-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M12 7v5l3 3" /></svg>
              </div>
              <h3>إضافات الخدام</h3>
              <p>مراجعة وتدقيق الإضافات المقترحة من قبل الخدام.</p>
            </div>

            <div className="glass admin-nav-card" onClick={() => setAdminView('services')}>
              <div className="admin-nav-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </div>
              <h3>إعدادات الخدمات</h3>
              <p>إضافة وتعديل أنواع الخدمات المتاحة في النظام بالكامل.</p>
            </div>

            <div className="glass admin-nav-card" onClick={() => setAdminView('reports')}>
              {reports.length > 0 && (
                <div className="admin-badge">
                  {reports.length}
                </div>
              )}
              <div className="admin-nav-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </div>
              <h3>تعديلات واقتراحات</h3>
              <p>مراجعة اقتراحات الخدام وتصحيح المعلومات الخاطئة.</p>
            </div>
          </div>
        )}
        {effectiveIsAdmin && adminView !== 'main' && (
          <div className="admin-sticky-bar" style={isSearchExpanded ? { padding: '0.4rem' } : undefined}>
            {isSearchExpanded && adminView === 'columns' ? (
              <div className="search-container" style={{ width: '100%', margin: 0, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="ابحث برقم العمود أو اسم الموكب..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: '3.5rem', paddingRight: '3rem' }}
                  autoFocus
                />
                <div className="search-icon" style={{ right: '1rem', left: 'auto' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <button
                  onClick={() => { setIsSearchExpanded(false); setSearch(''); }}
                  style={{ position: 'absolute', left: '3rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', zIndex: 10 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <button
                  className={`inline-filter-btn ${selectedFilters.length > 0 ? 'active' : ''}`}
                  onClick={() => { setTempFilters([...selectedFilters]); setIsFilterModalOpen(true); }}
                  title="تصفية النتائج"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  {selectedFilters.length > 0 && <span className="inline-filter-badge">{selectedFilters.length}</span>}
                </button>
              </div>
            ) : (
              <>
                <button className="admin-icon-btn" onClick={() => setAdminView('main')} title="رجوع">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>

                {adminView === 'pending' && (
                  <>
                    <div className="admin-glass-tabs">
                      <button className={`glass-tab-btn ${pendingTab === 'new' ? 'active' : ''}`} onClick={() => setPendingTab('new')}>الطلبات ({pendingMoukebs.length})</button>
                      {adminPassword === 'kmnt' && (
                        <button className={`glass-tab-btn ${pendingTab === 'archived' ? 'active' : ''}`} onClick={() => setPendingTab('archived')}>الأرشيف ({archivedPending.length})</button>
                      )}
                    </div>
                    <button className="admin-icon-btn refresh-btn" onClick={fetchPendingMoukebs} title="تحديث">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
                    </button>
                  </>
                )}

                {adminView === 'columns' && (
                  <>
                    <div style={{ flex: 1 }}></div>
                    <button className="admin-icon-btn refresh-btn" onClick={() => setIsSearchExpanded(true)} title="بحث">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {effectiveIsAdmin && adminView === 'columns' && selectedFilters.length > 0 && (
          <div className="active-filters-banner" style={{ margin: '0 auto 2rem auto', maxWidth: '900px' }}>
            <span className="banner-text">تصفية حالية لـ:</span>
            <div className="banner-tags">
              {selectedFilters.map(f => (
                <span key={f} className="banner-tag">{getServiceIcon(f)} {f}</span>
              ))}
            </div>
            <button className="clear-filters-btn" onClick={() => setSelectedFilters([])}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              إلغاء الفلترة
            </button>
          </div>
        )}

        <div style={{ display: !effectiveIsAdmin ? 'block' : 'none' }}>

          <div className="search-filter-wrapper" style={{ flexDirection: 'column', gap: '1rem', width: '100%', paddingTop: (!effectiveIsAdmin || adminView === 'main') ? '0' : '100px', marginBottom: '3rem', marginTop: '0' }}>
            <div className="search-container" style={{ width: '100%', maxWidth: '100%', position: 'relative' }}>
              <input
                type="text"
                placeholder="ابحث برقم العمود أو اسم الموكب..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '3.5rem' }}
              />
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <button
                className={`inline-filter-btn ${selectedFilters.length > 0 ? 'active' : ''}`}
                onClick={() => { setTempFilters([...selectedFilters]); setIsFilterModalOpen(true); }}
                title="تصفية النتائج"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                {selectedFilters.length > 0 && <span className="inline-filter-badge">{selectedFilters.length}</span>}
              </button>
            </div>

            {selectedFilters.length > 0 && (
              <div className="active-filters-banner">
                <span className="banner-text">تصفية حالية لـ:</span>
                <div className="banner-tags">
                  {selectedFilters.map(f => (
                    <span key={f} className="banner-tag">{getServiceIcon(f)} {f}</span>
                  ))}
                </div>
                <button className="clear-filters-btn" onClick={() => setSelectedFilters([])}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  إلغاء الفلترة
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}



        {effectiveIsAdmin && adminView === 'pending' && (
          <div className="admin-list-view" style={{ paddingTop: "0" }}>


            {pendingTab === 'new' ? (
              pendingMoukebs.length > 0 ? (
                <div className="pending-section" style={{ marginBottom: "3rem", padding: "2rem", background: "rgba(255, 0, 0, 0.1)", borderRadius: "16px", border: "1px solid var(--accent-color)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {pendingMoukebs.map(pending => (
                      <div key={pending.id} className="admin-list-item" style={{ background: "rgba(0,0,0,0.4)", padding: "1rem", borderRadius: "12px" }}>
                        <div className="admin-list-header">
                          <span className="admin-col-number">عمود {pending.column}</span>
                          <div className="admin-actions">
                            <button className="primary-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }} onClick={() => handleApprovePending(pending.id)}>✅ قبول</button>
                            <button className="delete-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }} onClick={() => handleRejectPending(pending.id)}>❌ رفض</button>
                          </div>
                        </div>
                        <div className="admin-list-content" style={{ gap: '0.4rem' }}>
                          <div className="admin-detail-item" style={{ fontSize: '0.9rem' }}><strong>الاسم:</strong> {pending.names.join('، ')}</div>
                          {pending.country && <div className="admin-detail-item" style={{ fontSize: '0.85rem' }}><strong>الدولة:</strong> {pending.country}</div>}
                          {(() => {
                              const noteStr = pending.note || "";
                              if (!noteStr) return null;
                              if (noteStr.startsWith("الخدمات: ")) {
                                const srvs = noteStr.replace("الخدمات: ", "").split("، ");
                                return (
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' }}>
                                    {srvs.map(srv => (
                                      <span key={srv} className="banner-tag" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                                        {getServiceIcon(srv)} {srv}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }
                              return <div className="admin-detail-item" style={{ fontSize: '0.85rem' }}><strong>ملاحظة:</strong> <span style={{ color: "var(--accent-color)" }}>{pending.note}</span></div>;
                            })()}
                          {pending.createdAt && <div className="admin-detail-item" style={{ opacity: 0.5, fontSize: "0.75rem", marginTop: '0.3rem' }}>تاريخ: {new Date(pending.createdAt).toLocaleString('ar-SA')}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "1.2rem" }}>لا توجد طلبات إضافة جديدة.</div>
              )
            ) : (
              archivedPending.length > 0 ? (
                <div className="pending-section" style={{ marginBottom: "3rem", padding: "2rem", background: "rgba(0, 0, 0, 0.4)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {archivedPending.map(pending => (
                      <div key={`arch-${pending.id}`} className="admin-list-item" style={{ opacity: 0.8, padding: "1rem", borderRadius: "12px", background: "rgba(0,0,0,0.2)" }}>
                        <div className="admin-list-header">
                          <span className="admin-col-number">عمود {pending.column}</span>
                          <span className="banner-tag" style={{ background: pending.status === 'approved' ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)' }}>
                            {pending.status === 'approved' ? 'مقبول' : 'مرفوض'}
                          </span>
                        </div>
                        <div className="admin-list-content" style={{ gap: '0.4rem' }}>
                          <div className="admin-detail-item" style={{ fontSize: '0.9rem' }}><strong>الاسم:</strong> {pending.names.join('، ')}</div>
                          {(() => {
                              const noteStr = pending.note || "";
                              if (!noteStr) return null;
                              if (noteStr.startsWith("الخدمات: ")) {
                                const srvs = noteStr.replace("الخدمات: ", "").split("، ");
                                return (
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' }}>
                                    {srvs.map(srv => (
                                      <span key={srv} className="banner-tag" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                                        {getServiceIcon(srv)} {srv}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }
                              return <div className="admin-detail-item" style={{ fontSize: '0.85rem' }}><strong>ملاحظة:</strong> <span style={{ color: "var(--accent-color)" }}>{pending.note}</span></div>;
                            })()}
                          <div className="admin-detail-item" style={{ opacity: 0.5, fontSize: "0.75rem", marginTop: '0.3rem' }}>تاريخ الأرشفة: {new Date(pending.archivedAt).toLocaleString('ar-SA')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "1.2rem" }}>الأرشيف فارغ.</div>
              )
            )}
          </div>
        )}

        {effectiveIsAdmin && adminView === 'reports' && (
          <div className="admin-list-view" style={{ paddingTop: "0" }}>
            <div className="admin-tabs" style={{ display: "flex", gap: "1rem", marginBottom: "1rem", justifyContent: "center" }}>
              <button className={`glass-tab-btn ${reportsTab === 'new' ? 'active' : ''}`} onClick={() => setReportsTab('new')}>الجديدة ({reports.length})</button>
              {adminPassword === 'kmnt' && (
                <button className={`glass-tab-btn ${reportsTab === 'archived' ? 'active' : ''}`} onClick={() => setReportsTab('archived')}>الأرشيف ({archivedReports.length})</button>
              )}
            </div>
            
            {reportsTab === 'new' ? (
              reports.length > 0 ? (
                <div className="reports-section" style={{ marginBottom: "3rem", padding: "2rem", background: "rgba(255, 0, 0, 0.1)", borderRadius: "16px", border: "1px solid #ff4444" }}>
                  <h3 style={{ color: "#ff4444", marginBottom: "1.5rem" }}>التعديلات المقترحة (البلاغات) ({reports.length})</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {reports.map(report => (
                      <div key={report.id} className="admin-list-item" style={{ background: "rgba(0,0,0,0.4)", padding: "1rem", borderRadius: "12px" }}>
                        <div className="admin-list-header">
                          <span className="admin-col-number">عمود {report.column}</span>
                          <div className="admin-actions">
                            <button className="primary-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }} onClick={() => handleApproveReport(report.id)}>✅ تم التعديل</button>
                            <button className="delete-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }} onClick={() => handleIgnoreReport(report.id)}>❌ تجاهل</button>
                          </div>
                        </div>
                        <div className="admin-list-content">
                          <div className="admin-detail-item"><strong>الملاحظة:</strong> {report.text}</div>
                          <div className="admin-detail-item" style={{ opacity: 0.5, fontSize: "0.8rem" }}>تاريخ: {new Date(report.timestamp).toLocaleString('ar-SA')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "1.2rem" }}>لا توجد اقتراحات أو بلاغات جديدة.</div>
              )
            ) : (
              archivedReports.length > 0 ? (
                <div className="reports-section" style={{ marginBottom: "3rem", padding: "2rem", background: "rgba(255, 255, 255, 0.05)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {archivedReports.map(report => (
                      <div key={report.id} className="admin-list-item glass" style={{ padding: "1rem", borderRadius: "12px" }}>
                        <div className="admin-list-header">
                          <span className="admin-col-number">عمود {report.column}</span>
                        </div>
                        <div className="admin-list-content">
                          <div className="admin-detail-item"><strong>الملاحظة:</strong> {report.text}</div>
                          <div className="admin-detail-item" style={{ opacity: 0.5, fontSize: "0.8rem" }}>
                            الحالة: {report.status === 'approved' ? '✅ تم الاعتماد' : '❌ تم التجاهل'} | 
                            تاريخ: {new Date(report.timestamp).toLocaleString('ar-SA')} | 
                            أرشفة: {new Date(report.archivedAt).toLocaleString('ar-SA')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "1.2rem" }}>الأرشيف فارغ.</div>
              )
            )}
          </div>
        )}

        {effectiveIsAdmin && adminView === 'columns' && (
          <div className="admin-list-view" style={{ paddingTop: "0" }}>
            {filteredMoukebs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>لا توجد نتائج مطابقة لبحثك.</div>
            ) : (
              filteredMoukebs.map(col => (
                <div key={col.column} className="admin-list-item glass">
                  <div className="admin-list-header">
                    <span className="admin-col-number">عمود {col.column}</span>
                    <div className="admin-actions">
                      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(col.column); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "var(--accent-color)", color: "white", padding: "0.4rem 0.8rem", borderRadius: "8px", border: "none" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> حذف العمود</button>
                    </div>
                  </div>
                  <div className="admin-list-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                    {col.names.map((name: string, i: number) => {
                      const allNotes = col.note ? col.note.split(' - ') : [];
                      const moukebServices = allNotes[i] ? allNotes[i].replace('الخدمات:', '').trim().split('،').map((s: string) => s.trim()).filter((s: string) => s) : [];

                      return (
                        <div key={i} style={{ border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', flex: 1 }}>
                              <div className="badge-icon-wrapper" style={{ transform: 'scale(0.8)', transformOrigin: 'right center' }}>
                                {getServiceIcon(name)}
                              </div>
                              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '0.85rem' }}>{name}</span>
                              {moukebServices.length > 0 && (
                                <div style={{ display: 'flex', gap: '0.2rem', marginRight: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                  {moukebServices.map((srv: string, j: number) => (
                                    <div key={j} title={srv} style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-color)', fontSize: '0.7rem', background: 'rgba(255, 0, 0, 0.05)', padding: '0.15rem 0.4rem', borderRadius: '10px', border: '1px solid rgba(255, 0, 0, 0.2)' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px' }}>
                                        {getServiceIcon(srv)}
                                      </div>
                                      <span>{srv}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.6rem', marginRight: '0.5rem' }}>
                              <button className="edit-btn" onClick={(e) => { e.stopPropagation(); openEditModal(col, i); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3rem' }} title="تعديل">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                              </button>
                              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteMoukebFromColumn(col, i); }} style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3rem' }} title="حذف">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {(!effectiveIsAdmin || adminView === 'columns') && (
          <div className="columns-grid">
            {filteredMoukebs.length === 0 ? (
              <div style={{ textAlign: "center", width: "100%", padding: "2rem", color: "var(--text-muted)" }}>لا توجد نتائج مطابقة لبحثك.</div>
            ) : (
              filteredMoukebs.map(col => (
                <div key={col.column} style={{ display: 'flex', flexDirection: 'column', gridColumn: expandedCol === col.column ? '1 / -1' : 'auto' }}>
                  <div
                    className={`column-card glass ${expandedCol === col.column ? 'expanded' : ''}`}
                    style={expandedCol === col.column ? { marginBottom: '0.5rem' } : undefined}
                    onClick={(e) => {
                      setExpandedCol(expandedCol === col.column ? null : col.column);
                    }}
                  >
                    <div className={`card-top-row ${expandedCol === col.column ? 'is-expanded' : 'is-closed'}`}>
                      {expandedCol === col.column && (
                        <div className="smart-badges-container">
                          {(() => {
                            const noteParts = col.note ? col.note.split(' - ') : [];
                            return col.names.map((name: string, index: number) => {
                              const isService = allKnownServices.includes(name);
                              if (isService) {
                                return (
                                  <div key={`item-${index}`} className="smart-badge badge-service">
                                    <div className="badge-icon-wrapper">
                                      {getServiceIcon(name)}
                                    </div>
                                    <span className="badge-text">{name}</span>
                                  </div>
                                );
                              } else {
                                const notePart = noteParts[index] || '';
                                const services = notePart.replace('الخدمات:', '').split(/[،,]/).map((s: string) => s.trim()).filter(Boolean);
                                return (
                                  <div key={`item-${index}`} className="moukeb-unified-block">
                                    <div className="moukeb-unified-title" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                                      <div className="badge-icon-wrapper">
                                        {getServiceIcon(name)}
                                      </div>
                                      <span className="moukeb-unified-text">{name}</span>
                                      {col.country && index === 0 && (
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3" /><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /></svg>
                                          {col.country}
                                        </span>
                                      )}
                                      {services.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.3rem', marginRight: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                          {services.map((srv: string, i: number) => (
                                            <div key={i} title={srv} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-color)', fontSize: '0.75rem', background: 'rgba(255, 0, 0, 0.05)', padding: '0.15rem 0.5rem', borderRadius: '15px', border: '1px solid rgba(255, 0, 0, 0.2)' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px' }}>
                                                {getServiceIcon(srv)}
                                              </div>
                                              <span style={{ whiteSpace: 'nowrap' }}>{srv}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>


                                  </div>
                                );
                              }
                            });
                          })()}
                        </div>
                      )}
                      <div className="col-number-block">
                        <span className="col-label">عمود</span>
                        <span className="col-number">{col.column}</span>
                        {expandedCol !== col.column && (col.names.length > 0 || col.note) && (
                          <div className="col-closed-icons">
                            {(() => {
                              let rawIcons: string[] = [...col.names];
                              if (col.note) {
                                const extracted = col.note.replaceAll('الخدمات:', '').replaceAll('-', ' ').split(/[،,]/).map((s: string) => s.trim()).filter(Boolean);
                                rawIcons = [...rawIcons, ...extracted];
                              }

                              const normalized = rawIcons.map(n => {
                                if (allKnownServices.includes(n) || ["دورات مياه"].includes(n)) return n;
                                if (n.includes("مياه")) return "مياه شرب";
                                if (n.includes("مبيت")) return "مبيت";
                                if (n.includes("ضيافة")) return "ضيافة وطعام";
                                if (n.includes("غسيل")) return "غسيل ملابس";
                                if (n.includes("طبية") || n.includes("علاج")) return "مفرزة طبية";
                                if (n.includes("مفقودين")) return "مركز المفقودين";
                                if (n.includes("اتصالات")) return "مركز اتصالات";
                                if (n.includes("استفتاءات")) return "استفتاءات شرعية";
                                if (n.includes("صيانة") || n.includes("تصليح")) return "صيانة عربات";
                                if (n.includes("خياطة")) return "خياطة";
                                if (n.includes("شحن") || n.includes("هواتف")) return "شحن هواتف";
                                if (n.includes("إنترنت") || n.includes("انترنت")) return "إنترنت مجاني";
                                if (n.includes("موكب") || n.includes("حسينية") || n.includes("نقطة") || n.includes("مضيف") || n.includes("مخيم") || n.includes("مسجد") || n.includes("جامع")) return "موكب أو حسينية";
                                return "خدمات أخرى";
                              });

                              const counts: Record<string, number> = {};
                              normalized.forEach(n => {
                                counts[n] = (counts[n] || 0) + 1;
                              });

                              const iconsArray = Object.entries(counts);

                              return (
                                <>
                                  {iconsArray.slice(0, 5).map(([name, count], i) => (
                                    <span key={i} className="closed-icon-wrapper" title={name}>
                                      {getServiceIcon(name)}
                                      {count > 1 && <span className="icon-badge">{count}</span>}
                                    </span>
                                  ))}
                                  {iconsArray.length > 5 && <span className="closed-icon-wrapper-more">+{iconsArray.length - 5}</span>}
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {expandedCol === col.column && (
                    <div className="report-trigger-container" style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 1rem', marginBottom: '1rem' }}>
                      <button
                        className="report-trigger-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReportColumn(col.column);
                          setReportModalOpen(true);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>هل توجد معلومة غير دقيقة؟</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        {effectiveIsAdmin && adminView === 'services' && (
          <div className="admin-list-view" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: "0" }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
                <select id="newServiceGroup" style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo', outline: 'none' }}>
                  {Object.keys(knownServices).map(cat => <option key={cat} value={cat} style={{ background: '#222', color: 'white' }}>{cat}</option>)}
                </select>
                <input
                  type="text"
                  id="newServiceInput"
                  placeholder="اسم الخدمة الجديدة..."
                  style={{ flex: '2 1 300px', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Cairo', outline: 'none' }}
                />
                <button
                  className="primary-btn"
                  style={{ flex: '1 1 150px' }}
                  onClick={async () => {
                    const input = document.getElementById('newServiceInput') as HTMLInputElement;
                    const select = document.getElementById('newServiceGroup') as HTMLSelectElement;
                    if (input && input.value.trim() && select && select.value) {
                      const newSrv = input.value.trim();
                      const category = select.value;
                      const updatedServices = { ...knownServices };
                      if (!updatedServices[category].includes(newSrv)) {
                        updatedServices[category] = [...updatedServices[category], newSrv];
                        setKnownServices(updatedServices);
                        input.value = '';
                        await fetch(`/api/services?adminPassword=${adminPassword}`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
                          body: JSON.stringify({ services: updatedServices })
                        });
                      }
                    }
                  }}
                >
                  إضافة خدمة
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.keys(knownServices).map(category => (
                  <div key={category} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '15px' }}>
                    <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '1.1rem' }}>{category}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {knownServices[category].map(srv => (
                        <div key={srv} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>{getServiceIcon(srv)}</span>
                            {srv}
                          </span>
                          {PREDEFINED_SERVICES.includes(srv) ? (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '5px' }}>أساسي</span>
                          ) : (
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                              <button
                                onClick={async () => {
                                  const newName = prompt(`تعديل اسم الخدمة "${srv}":`, srv);
                                  if (newName && newName.trim() && newName.trim() !== srv) {
                                    const updatedServices = { ...knownServices };
                                    const index = updatedServices[category].indexOf(srv);
                                    if (index !== -1) {
                                      updatedServices[category][index] = newName.trim();
                                      setKnownServices(updatedServices);
                                      await fetch(`/api/services?adminPassword=${adminPassword}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
                                        body: JSON.stringify({ services: updatedServices })
                                      });
                                    }
                                  }
                                }}
                                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}
                              >
                                تعديل
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`هل أنت متأكد من حذف خدمة "${srv}" من "${category}"؟`)) {
                                    const updatedServices = { ...knownServices };
                                    updatedServices[category] = updatedServices[category].filter((s: string) => s !== srv);
                                    setKnownServices(updatedServices);
                                    await fetch(`/api/services?adminPassword=${adminPassword}`, {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
                                      body: JSON.stringify({ services: updatedServices })
                                    });
                                  }
                                }}
                                style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '0.9rem' }}
                              >
                                حذف
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </main>

      {/* Footer */}
      <footer className="app-footer" style={{ paddingBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p className="footer-text">مَشّاية .. من أعمال خادم</p>
        <div className="footer-logos" style={{ marginBottom: '1.5rem' }}>
          <MashayaLogo className="footer-logo" />
          <span className="footer-arrow">←</span>
          <SecondaryLogo className="footer-secondary-logo" />
        </div>
        
        <div style={{ width: '80%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', textAlign: 'center' }}>
          <a href="mailto:khademcrs@gmail.com" style={{
            fontSize: '0.65rem', 
            color: 'var(--text-muted)', 
            textDecoration: 'none', 
            opacity: 0.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            للتواصل والمقترحات: khademcrs@gmail.com
          </a>
        </div>
      </footer>



      {/* Report Modal */}
      {reportModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmittingReport && setReportModalOpen(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <h2 className="text-gradient" style={{ marginBottom: '1.5rem' }}>إبلاغ عن بيانات غير دقيقة (عمود {reportColumn})</h2>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <textarea
                  required
                  placeholder="اكتب الملاحظة أو التعديل الصحيح هنا..."
                  className="search-input"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white", minHeight: "150px", resize: "vertical" }}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                ></textarea>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="primary-btn" disabled={isSubmittingReport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  {isSubmittingReport ? "جاري الإرسال..." : "إرسال الملاحظة"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setReportModalOpen(false)} disabled={isSubmittingReport}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent-color)', color: 'white', padding: '1rem 2rem',
          borderRadius: '30px', boxShadow: '0 10px 30px rgba(255, 0, 85, 0.3)',
          zIndex: 9999, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.8rem',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          تم استلام طلبك للمراجعة. شكراً لخدمتك!
        </div>
      )}

      {/* Report Toast */}
      {showReportToast && (
        <div className="report-toast">
          تم استلام اقتراحك، ونشكر لك حرصك على خدمة الزوار. سيتم مراجعة الطلب من قبل المشرف.
        </div>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>تصفية النتائج</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
              يمكنك تحديد أكثر من خدمة، وسيعرض النظام الأعمدة التي تحتوي على <strong>جميع</strong> الخدمات المحددة معاً.
            </p>
            <div className="filter-options-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {Array.from(new Set(["موكب أو حسينية", ...allKnownServices, "دورات مياه", "مبيت", "ضيافة وطعام", "غسيل ملابس"])).map(ft => (
                <button
                  key={ft}
                  className={`filter-pill ${tempFilters.includes(ft) ? 'active' : ''}`}
                  onClick={() => {
                    if (tempFilters.includes(ft)) setTempFilters(tempFilters.filter(f => f !== ft));
                    else setTempFilters([...tempFilters, ft]);
                  }}
                  style={{ width: 'auto', padding: '0.4rem 0.8rem', borderRadius: '15px' }}
                >
                  {getServiceIcon(ft)}
                  <span style={{ fontSize: '0.85rem' }}>{ft}</span>
                </button>
              ))}
            </div>
            <button className="primary-btn" style={{ marginTop: '2rem', width: '100%', fontSize: '1.1rem' }} onClick={() => { setSelectedFilters(tempFilters); setIsFilterModalOpen(false); }}>تم عرض النتائج</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
            <h2 style={{ color: "#4ade80", marginBottom: "1rem" }}>🟢 تم استلام الطلب بنجاح</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              شكراً لمساهمتك. تم إرسال بيانات الإضافة وهي الآن قيد المراجعة.<br />
              يرجى عدم إرسال الطلب مرة أخرى؛ سيتم إدراج المعلومات في الموقع فور التحقق منها واعتمادها.
            </p>
            <button className="primary-btn" onClick={() => setShowSuccessModal(false)}>حسناً، فهمت</button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{ maxWidth: "400px", padding: "2.5rem 2rem", textAlign: "center" }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '80px', height: '80px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.1 68.1" style={{ width: "100%", height: "100%" }}>
                  <defs>
                    <linearGradient id="khadimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff0000" />
                      <stop offset="100%" stopColor="#ff0000" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#khadimGradient)" d="M75.2,12.8l-16.3,15.4c-.6.6-.9,1.3-.9,2.1l-.2,13.5h5.2c0,0,.2-12.5.2-12.5l6.7-6.3-3.8,26h-11.3l-.2-20c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9l.2,24.3c0,.5.4.9.9.9h22.2c.5,0,.9-.4.9-.9v-3.4c0-.5-.4-.9-.9-.9h-1.4l5.5-37.5c.1-.8-.9-1.3-1.5-.8Z" />
                  <path fill="url(#khadimGradient)" d="M38.8,30.4c-3.6,0-6.5,2.9-6.5,6.5v.3c0,.5.4.9.9.9h3.4c.5,0,.9-.4.9-.9v-.3c0-.7.6-1.3,1.3-1.3h2.1v15.5c0,0-3.4,0-3.4,0v-6.4c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9v10.7c0,.5.4.9.9.9h12.1c.5,0,.9-.4.9-.9v-24.1c-.1-.5-.5-.9-1-.9h-6.3Z" />
                  <path fill="url(#khadimGradient)" d="M15.9,51.1h-1.8c-.5,0-.9.4-.9.9v3.4c0,.5.4.9.9.9h14.6c.5,0,.9-.4.9-.9v-24.9c0-.9-.4-1.7-1-2.3L11.4,13c-.6-.5-1.6,0-1.5.8l6,37.3ZM24.4,31.4v19.7h-3.3l-4.2-26.3,7.5,6.6Z" />
                  <path fill="url(#khadimGradient)" d="M56.9,23.3h0c1.7,0,3-1.4,3-3.1h0s0,0,0,0c0-1.7-1.4-3-3.1-3h0c-1.7,0-3,1.4-3,3.1h0s0,0,0,0c0,1.7,1.4,3,3.1,3h0Z" />
                </svg>
              </div>
            </div>
            <h2 className="text-gradient" style={{ marginBottom: "2rem", fontSize: "1.8rem" }}>تسجيل دخول خادم</h2>
            <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="form-group" style={{ textAlign: "right" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="search-input"
                    style={{ width: "100%", paddingRight: "3rem", backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
                    placeholder="أدخل كلمة المرور..."
                  />
                  <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
                  </div>
                </div>
                <div style={{ color: "var(--accent-color)", fontStyle: "italic", marginTop: "1rem", fontSize: "0.95rem", textAlign: "center", opacity: 0.9 }}>
                  &quot;شرفُ الخادم.. نسبُه إلى مولاه&quot;
                </div>
              </div>
              <div className="form-actions" style={{ display: "flex", flexDirection: "row", gap: "0.8rem", marginTop: "0.5rem" }}>
                <button type="submit" className="primary-btn" style={{ flex: 2, fontSize: "1.1rem", padding: "0.8rem" }}>تسجيل الدخول</button>
                <button type="button" className="cancel-btn" onClick={() => setShowLoginModal(false)} style={{ flex: 1, padding: "0.8rem" }}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Moukeb Modal */}
      {isEditModalOpen && editingMoukeb && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setIsEditModalOpen(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
                <h2 className="text-gradient" style={{ margin: 0 }}>تعديل الموكب والخدمات</h2>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <label style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-color)', fontWeight: 'bold' }}>رقم العمود *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    required
                    value={editingMoukeb.column || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setEditingMoukeb({ ...editingMoukeb, column: val ? parseInt(val) : 0 });
                    }}
                    placeholder="0000"
                    style={{
                      fontSize: '1.5rem',
                      textAlign: 'center',
                      letterSpacing: '2px',
                      padding: '0.4rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.02)',
                      color: editingMoukeb.column ? '#ff5e62' : 'rgba(255,255,255,0.3)',
                      textShadow: editingMoukeb.column ? '0 0 15px rgba(255,94,98,0.5)' : 'none',
                      border: editingMoukeb.column ? '2px solid var(--accent-color)' : '2px dashed rgba(255,255,255,0.1)',
                      boxShadow: editingMoukeb.column ? '0 0 20px rgba(255, 0, 85, 0.2)' : 'none',
                      fontWeight: 'bold',
                      width: '100%',
                      maxWidth: '150px',
                      margin: '0',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={e => e.target.style.border = '2px solid var(--accent-color)'}
                    onBlur={e => {
                      e.target.style.border = editingMoukeb.column ? '2px solid var(--accent-color)' : '2px dashed rgba(255,255,255,0.1)';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ flex: '2 1 200px', marginBottom: 0 }}>
                    <label style={{ fontSize: '0.7rem' }}>الموكب / الحسينية (اختياري)</label>
                    <textarea
                      value={editingMoukeb.name}
                      onChange={e => setEditingMoukeb({ ...editingMoukeb, name: e.target.value })}
                      placeholder="(اتركه فارغاً إذا كان نقطة خدمة فردية)"
                      rows={1}
                      style={{ resize: 'vertical', minHeight: '30px', fontSize: '0.8rem', padding: '0.4rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
                    <label style={{ fontSize: '0.7rem' }}>البلدة (اختياري)</label>
                    <textarea
                      value={editingMoukeb.country || ''}
                      onChange={e => setEditingMoukeb({ ...editingMoukeb, country: e.target.value })}
                      placeholder="مثل: البحرين"
                      rows={1}
                      style={{ resize: 'vertical', minHeight: '30px', fontSize: '0.8rem', padding: '0.4rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem' }}>اختر الخدمات المتوفرة</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                    {allKnownServices.map(srv => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => {
                          const hasSrv = editingMoukeb.services.includes(srv);
                          const newServices = hasSrv
                            ? editingMoukeb.services.filter(s => s !== srv)
                            : [...editingMoukeb.services, srv];
                          setEditingMoukeb({ ...editingMoukeb, services: newServices });
                        }}
                        style={{
                          padding: '0.25rem 0.5rem', borderRadius: '15px', border: '1px solid var(--accent-color)',
                          background: editingMoukeb.services.includes(srv) ? 'var(--accent-color)' : 'transparent',
                          color: editingMoukeb.services.includes(srv) ? 'white' : 'var(--text-color)',
                          cursor: 'pointer', fontFamily: 'Cairo', fontSize: '0.75rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px' }}>{getServiceIcon(srv)}</span>
                        {srv}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const newService = prompt("أدخل اسم الخدمة الجديدة:");
                        if (newService && newService.trim() !== "") {
                          const srvName = newService.trim();
                          setKnownServices(prev => {
                            const newState = { ...prev };
                            if (!newState["خدمات مضافة"]) newState["خدمات مضافة"] = [];
                            if (!newState["خدمات مضافة"].includes(srvName)) {
                              newState["خدمات مضافة"].push(srvName);
                            }
                            return newState;
                          });
                          if (!editingMoukeb.services.includes(srvName)) {
                            setEditingMoukeb({ ...editingMoukeb, services: [...editingMoukeb.services, srvName] });
                          }
                        }
                      }}
                      style={{
                        padding: '0.4rem 1rem', borderRadius: '20px', border: '1px dashed var(--accent-color)',
                        background: 'transparent',
                        color: 'var(--accent-color)',
                        cursor: 'pointer', fontFamily: 'Cairo', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      إضافة خدمة أخرى
                    </button>
                  </div>
                </div>

                <div className="form-actions" style={{ display: "flex", flexDirection: "row", gap: "0.8rem", marginTop: "1rem" }}>
                  <button type="submit" className="primary-btn" disabled={isSubmitting} style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: "0.8rem", fontSize: "1.1rem" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)} style={{ flex: 1, padding: "0.8rem" }}>إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setIsModalOpen(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>

            {addStep === 1 && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.1 68.1" style={{ width: '80px', height: '80px' }}>
                    <defs>
                      <linearGradient id="khadimGradientModal" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#b60000" />
                        <stop offset="100%" stopColor="#ff0000" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#khadimGradientModal)" d="M75.2,12.8l-16.3,15.4c-.6.6-.9,1.3-.9,2.1l-.2,13.5h5.2c0,0,.2-12.5.2-12.5l6.7-6.3-3.8,26h-11.3l-.2-20c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9l.2,24.3c0,.5.4.9.9.9h22.2c.5,0,.9-.4.9-.9v-3.4c0-.5-.4-.9-.9-.9h-1.4l5.5-37.5c.1-.8-.9-1.3-1.5-.8Z" />
                    <path fill="url(#khadimGradientModal)" d="M38.8,30.4c-3.6,0-6.5,2.9-6.5,6.5v.3c0,.5.4.9.9.9h3.4c.5,0,.9-.4.9-.9v-.3c0-.7.6-1.3,1.3-1.3h2.1v15.5c0,0-3.4,0-3.4,0v-6.4c0-.5-.4-.9-.9-.9h-3.4c-.5,0-.9.4-.9.9v10.7c0,.5.4.9.9.9h12.1c.5,0,.9-.4.9-.9v-24.1c-.1-.5-.5-.9-1-.9h-6.3Z" />
                    <path fill="url(#khadimGradientModal)" d="M15.9,51.1h-1.8c-.5,0-.9.4-.9.9v3.4c0,.5.4.9.9.9h14.6c.5,0,.9-.4.9-.9v-24.9c0-.9-.4-1.7-1-2.3L11.4,13c-.6-.5-1.6,0-1.5.8l6,37.3ZM24.4,31.4v19.7h-3.3l-4.2-26.3,7.5,6.6Z" />
                    <path fill="url(#khadimGradientModal)" d="M56.9,23.3h0c1.7,0,3-1.4,3-3.1h0s0,0,0,0c0-1.7-1.4-3-3.1-3h0c-1.7,0-3,1.4-3,3.1h0s0,0,0,0c0,1.7,1.4,3,3.1,3h0Z" />
                  </svg>
                </div>
                <div style={{ color: "var(--accent-color)", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>
                  شرفُ الخادم.. نسبُه إلى مولاه
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  يا خادم الحسين.. دقةُ معلومتك هي جزءٌ من خدمتك. أضفْ بصدقٍ وإخلاص لتشارك في تسهيل المسير.
                </p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                  <button type="button" className="primary-btn" onClick={() => setAddStep(2)} style={{ flex: 2, padding: '1rem', fontSize: '1.1rem' }}>
                    أبدأ الإضافة الآن
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>إغلاق</button>
                </div>
              </div>
            )}

            {addStep === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                  <button type="button" onClick={() => setAddStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                  <h2 className="text-gradient" style={{ margin: 0 }}>إضافة خدمة جديدة</h2>
                </div>

                <form onSubmit={handleAddMoukeb}>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <label style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-color)', fontWeight: 'bold' }}>رقم العمود *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      required
                      value={formColumn}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setFormColumn(val);
                      }}
                      placeholder="0000"
                      style={{
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        letterSpacing: '2px',
                        padding: '0.4rem',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        color: formColumn ? '#ff5e62' : 'rgba(255,255,255,0.3)',
                        textShadow: formColumn ? '0 0 15px rgba(255,94,98,0.5)' : 'none',
                        border: formColumn ? '2px solid var(--accent-color)' : '2px dashed rgba(255,255,255,0.1)',
                        boxShadow: formColumn ? '0 0 20px rgba(255, 0, 85, 0.2)' : 'none',
                        fontWeight: 'bold',
                        width: '100%',
                        maxWidth: '150px',
                        margin: '0',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={e => e.target.style.border = '2px solid var(--accent-color)'}
                      onBlur={e => {
                        if (!formColumn) e.target.style.border = '2px dashed rgba(255,255,255,0.1)';
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                    <div className="form-group" style={{ flex: '2 1 200px', marginBottom: 0 }}>
                      <label style={{ fontSize: '0.7rem' }}>الموكب / الحسينية (اختياري)</label>
                      <textarea
                        value={formNames}
                        onChange={e => setFormNames(e.target.value)}
                        placeholder="(اتركه فارغاً إذا كان نقطة خدمة فردية)"
                        rows={1}
                        style={{ resize: 'vertical', minHeight: '30px', fontSize: '0.8rem', padding: '0.4rem' }}
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
                      <label style={{ fontSize: '0.7rem' }}>البلدة (اختياري)</label>
                      <textarea
                        value={formCountry}
                        onChange={e => setFormCountry(e.target.value)}
                        placeholder="مثل: البحرين"
                        rows={1}
                        style={{ resize: 'vertical', minHeight: '30px', fontSize: '0.8rem', padding: '0.4rem' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem' }}>اختر الخدمات المتوفرة</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                      {allKnownServices.map(srv => (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => handleToggleService(srv)}
                          style={{
                            padding: '0.25rem 0.5rem', borderRadius: '15px', border: '1px solid var(--accent-color)',
                            background: formMoukebServices.includes(srv) ? 'var(--accent-color)' : 'transparent',
                            color: formMoukebServices.includes(srv) ? 'white' : 'var(--text-color)',
                            cursor: 'pointer', fontFamily: 'Cairo', fontSize: '0.75rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px' }}>{getServiceIcon(srv)}</span>
                          {srv}
                        </button>
                      ))}
                    </div>

                    <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const newService = prompt("أدخل اسم الخدمة الجديدة:");
                          if (newService && newService.trim() !== "") {
                            const srvName = newService.trim();
                            setKnownServices(prev => {
                              const newState = { ...prev };
                              if (!newState["خدمات مضافة"]) newState["خدمات مضافة"] = [];
                              if (!newState["خدمات مضافة"].includes(srvName)) {
                                newState["خدمات مضافة"].push(srvName);
                              }
                              return newState;
                            });
                            if (!formMoukebServices.includes(srvName)) {
                              setFormMoukebServices(prev => [...prev, srvName]);
                            }
                          }
                        }}
                        style={{
                          padding: '0.4rem 1rem', borderRadius: '20px', border: '1px dashed var(--accent-color)',
                          background: 'transparent',
                          color: 'var(--accent-color)',
                          cursor: 'pointer', fontFamily: 'Cairo', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        إضافة خدمة أخرى
                      </button>
                    </div>
                  </div>

                  <div className="form-actions" style={{ display: "flex", flexDirection: "row", gap: "0.8rem", marginTop: "1rem" }}>
                    <button type="submit" className="primary-btn" disabled={isSubmitting} style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', padding: "0.8rem", fontSize: "1.1rem" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      {isSubmitting ? "جاري الإرسال..." : "إرسال للمراجعة"}
                    </button>
                    <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: "0.8rem" }}>إلغاء</button>
                  </div>
                </form>
              </div>
            )}

            {addStep === 3 && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ background: 'var(--accent-color)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(255,0,85,0.4)' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'white' }}>تم استلام طلبك بنجاح!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>شُكراً لخدمتك... تم إرسال بيانات الموكب للإدارة للمراجعة والاعتماد.</p>
                <button type="button" className="primary-btn" onClick={() => { setAddStep(1); setIsModalOpen(false); }} style={{ padding: '0.8rem 3rem', width: '100%', maxWidth: '200px' }}>حسناً، إغلاق</button>
              </div>
            )}

          </div>
        </div>
      )}

      <style jsx>{`
        /* Hero Section */
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 8rem 1rem 1rem;
        }
        
        :global(.hero-logo) {
          height: 100px;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.4));
        }

        /* Admin Hero Section */
        .admin-hero-container {
          text-align: center;
          margin-bottom: 2rem;
        }
        .admin-hero-logo {
          display: flex;
          justify-content: center;
          margin: 0 auto 1rem auto;
          width: 100px;
          height: 100px;
        }
        .admin-hero-title {
          color: #ff0000;
          font-size: 1.2rem !important;
          margin-bottom: 0.5rem;
          font-weight: 500 !important;
        }
        .admin-hero-text {
          color: #cccccc;
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 850px;
          margin: 0 auto;
          font-weight: 400;
        }
        
        /* Admin Nav Cards */
        .admin-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 0 1rem;
          max-width: 900px;
          margin: 0 auto 4rem auto;
        }
        .admin-nav-card {
          padding: 2rem;
          text-align: center;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }
        .admin-nav-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }
        .admin-nav-icon {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }
        .admin-nav-card h3 {
          margin: 0;
          color: white;
          font-size: 1.3rem;
          font-weight: bold;
        }
        .admin-nav-card p {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        .admin-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ff0000;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          box-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }
        
        .admin-sticky-bar {
          position: sticky;
          top: 105px;
          z-index: 50;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin: 100px auto 2rem auto;
          width: 100%;
          max-width: 900px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          flex-wrap: wrap;
        }

        .admin-sticky-bar .admin-glass-tabs {
          margin: 0;
          flex: 1;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .admin-sticky-bar {
            top: 95px;
            padding: 0.5rem;
            border-radius: 12px;
            gap: 0.5rem;
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .admin-sticky-bar .admin-glass-tabs {
            margin: 0;
            flex: 1;
            display: flex;
            gap: 0.3rem;
          }
          .glass-tab-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          .admin-icon-btn {
            width: 36px;
            height: 36px;
          }
        }
        
        .admin-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }
        .admin-icon-btn:hover {
          background: rgba(255, 0, 85, 0.2);
          border-color: rgba(255, 0, 85, 0.4);
          transform: scale(1.05);
        }
        .admin-icon-btn.refresh-btn {
          background: var(--accent-color);
          border: none;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }
        .admin-icon-btn.refresh-btn:hover {
          background: #ff0033;
        }

        .admin-glass-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }
        .glass-tab-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 12px;
          font-family: 'Cairo', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .glass-tab-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .glass-tab-btn.active {
          background: var(--accent-color);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
        }


        
        .hero-section h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 600px;
          margin-bottom: 1rem;
        }

        /* Header */
        .app-header {
          position: fixed;
          top: 15px;
          left: 15px;
          right: 15px;
          border-radius: 20px;
          z-index: 1000;
          background: linear-gradient(135deg, #b60000 0%, #ff0000 100%);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          transition: all 0.4s ease;
          padding: 1.5rem 2rem;
        }
        .app-header.scrolled {
          /* No padding change to keep the banner fixed size */
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .brand-identity {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: nowrap;
          gap: 1rem;
        }
        
        :global(.brand-logo) {
          height: 45px;
          width: 45px;
          min-width: 45px;
          flex-shrink: 0;
          display: block;
          color: black;
        }
        
        :global(.secondary-logo) {
          height: 15px;
          color: black;
          margin-top: -6px;
        }
        
        h1 {
          color: black;
          font-size: 1.8rem;
          font-weight: 900;
          margin: 0;
          user-select: none;
        }
        
        /* Footer */
        .app-footer {
          margin-top: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(0,0,0,0.2);
        }
        
        .footer-text {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .footer-logos {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        :global(.footer-logo) {
          height: 35px;
          color: white;
          opacity: 0.7;
        }
        
        :global(.footer-secondary-logo) {
          height: 38px;
          color: white;
          opacity: 0.7;
        }

        .footer-arrow {
          color: var(--text-muted);
          font-size: 1.5rem;
          opacity: 0.5;
        }
        
        .primary-btn-outline {
          background: black;
          border: 2px solid black;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          font-family: 'Cairo', sans-serif;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .primary-btn-outline:hover {
          background: transparent;
          color: black;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
        }

        #language-switcher {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Search */
        .search-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          z-index: 10;
        }
        
        .search-container input, .search-input {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.2rem 3rem 1.2rem 1.5rem;
          font-size: 1.1rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 100%;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .search-container input:focus, .search-input:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.2);
        }
        
        .search-icon {
          position: absolute;
          right: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          pointer-events: none;
        }

        /* Grid & Cards */
        .columns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1.5rem;
          position: relative;
          z-index: 5;
        }
        
        .column-card {
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          border: 2px solid var(--glass-border) !important;
        }


        .column-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: var(--card-hover);
          border-color: rgba(255, 0, 0, 0.6) !important;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
        }


        .column-card.expanded {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: stretch;
          transform: none;
          background: var(--card-hover);
          border-color: var(--accent-color) !important;
          box-shadow: 0 4px 25px rgba(255, 0, 0, 0.35);
        }


        @media (max-width: 600px) {
          .column-card.expanded {
            flex-direction: column;
          }
          .hero-section h2 {
            font-size: 2rem;
          }
        }

        .col-header {
          background: rgba(0, 0, 0, 0.4);
          padding: 2rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 140px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .column-card.expanded .col-header {
          border-bottom: none;
          border-left: 1px solid var(--border-color);
        }

        .col-label {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .col-number {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          color: white;
          text-shadow: var(--glow);
        }

        .col-details {
          padding: 2rem;
          flex-grow: 1;
        }

        .col-details ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5rem;
        }
        
        .col-details li {
          font-weight: 700;
          font-size: 1.2rem;
          padding: 0.8rem 0;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }
        .col-details li:last-child {
          border-bottom: none;
        }

        .detail-item {
          margin-bottom: 0.8rem;
          font-size: 1rem;
          color: var(--text-muted);
        }
        .detail-item strong {
          color: white;
        }

        .edit-btn, .delete-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-family: 'Cairo', sans-serif;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .edit-btn:hover { background: rgba(255, 0, 0, 0.5); }
        .delete-btn:hover { background: rgba(255, 0, 0, 0.5); }

        /* Admin List View */
        .admin-list-view {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 5;
          max-width: 900px;
          margin: 0 auto;
        }

        .admin-list-item {
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid var(--border-color);
        }

        .admin-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 1rem;
        }

        .admin-col-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-color);
          text-shadow: var(--glow);
        }

        .admin-actions {
          display: flex;
          gap: 0.8rem;
        }

        .admin-list-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .admin-detail-item {
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        .admin-detail-item strong {
          color: white;
          margin-left: 0.5rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 1rem;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 1.5rem;
          border-radius: 20px;
          max-height: 85vh;
          overflow-y: auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.8rem;
          color: var(--text-muted);
        }
        
        .cancel-btn {
          background: transparent;
          border: 1px solid var(--text-muted);
          color: var(--text-muted);
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          font-family: 'Cairo', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cancel-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .report-trigger-btn {
          background: transparent;
          border: none;
          color: #c0a062;
          font-family: 'Cairo', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .report-trigger-btn:hover {
          color: var(--accent-color);
        }

        .report-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(30, 30, 30, 0.95);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 1px solid var(--accent-color);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 10000;
          font-family: 'Cairo', sans-serif;
          font-weight: bold;
          text-align: center;
          animation: slideUpFade 0.5s ease-out;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .service-card {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          gap: 0.8rem;
        }
        
        .service-card:hover {
          background: rgba(255, 0, 0, 0.15);
          border-color: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255,140,0,0.2);
        }
        
        .service-card svg {
          color: var(--accent-color);
        }
        
        .service-card span {
          font-size: 0.85rem;
          font-weight: bold;
          line-height: 1.2;
        }
        
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.95rem;
        }
        
        @media (max-width: 768px) {
          .admin-hero-logo {
            width: 80px;
            height: 80px;
          }
          .admin-hero-title {
            font-size: 0.95rem !important;
            margin-bottom: 0.3rem;
            font-weight: 500 !important;
          }
          .admin-hero-text {
            font-size: 0.75rem;
            line-height: 1.4;
            padding: 0 0.5rem;
            font-weight: 400;
          }
          .admin-cards-container {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
            padding: 0 0.5rem;
          }
          .admin-nav-card {
            padding: 0.8rem 0.5rem;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .admin-nav-icon svg {
            width: 28px !important;
            height: 28px !important;
          }
          .admin-nav-icon {
            margin-bottom: 0.4rem;
          }
          .admin-nav-card h3 {
            font-size: 0.8rem;
          }
          .admin-nav-card p {
            display: block;
            font-size: 0.6rem;
            margin-top: 0.3rem;
            line-height: 1.2;
            opacity: 0.9;
          }
          .admin-badge {
            top: 5px;
            right: 5px;
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
          }
          .app-header {
            top: 10px;
            left: 10px;
            right: 10px;
            border-radius: 15px;
            padding: 0.8rem 1rem;
          }
          .header-top {
            gap: 0.5rem;
          }
          :global(.brand-logo) {
            height: 28px !important;
            width: 28px !important;
            min-width: 28px !important;
          }
          h1 {
            font-size: 1.1rem !important;
            font-weight: 700 !important;
          }
          :global(.secondary-logo) {
            height: 10px !important;
            margin-top: -3px !important;
          }
          .primary-btn-outline {
            padding: 0.4rem 0.8rem !important;
            font-size: 0.75rem !important;
            border-radius: 8px !important;
          }
          .hero-section p {
            font-size: 0.95rem !important;
            line-height: 1.6;
          }
          .search-input {
            padding: 0.8rem 1rem 0.8rem 2.5rem !important;
            font-size: 0.9rem !important;
            border-radius: 12px !important;
          }
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .columns-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }
          .column-card {
            padding: 0 !important;
            border-radius: 10px !important;
            min-width: 0 !important;
          }
          .col-header {
            min-width: unset !important;
            padding: 1rem 0 !important;
          }
          .col-label {
            font-size: 0.8rem !important;
            margin-bottom: 0.2rem !important;
          }
          .col-number {
            font-size: 2rem !important;
          }
          .col-number-block {
            padding: 0.5rem !important;
            min-width: unset !important;
          }
          .modal-content {
            padding: 0.8rem !important;
          }
          .card-title {
            font-size: 0.65rem !important;
            opacity: 0.8;
          }
          .hero-logo {
            width: 60px !important;
            height: 60px !important;
          }
          
          /* Uniform Card Layout on Mobile (Closed & Expanded) */
          .card-top-row {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .card-top-row .col-number-block {
            order: -1 !important; /* Force Number Block to the TOP */
            border-right: none !important;
            border-bottom: none !important;
            flex-direction: column !important; /* Stack: Label -> Number -> Icons */
            gap: 0.1rem !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0.8rem 0.2rem !important; /* Consistent padding for uniform height */
            width: 100% !important;
            background: transparent !important;
          }
          .column-card.expanded .col-number-block {
            border-bottom: 1px solid rgba(255,0,0,0.2) !important;
            padding: 0.5rem !important;
            background: rgba(0,0,0,0.3) !important;
          }
          .card-top-row .col-label {
            margin-bottom: 0 !important;
            font-size: 0.75rem !important;
            color: var(--text-muted) !important;
          }
          .card-top-row .col-number {
            font-size: 1.6rem !important;
            line-height: 1.1 !important;
          }
          
          /* Mini closed icons in one row */
          .col-closed-icons {
            flex-direction: row !important;
            flex-wrap: nowrap !important; /* Force one row */
            gap: 0.15rem !important;
            margin-top: 0.2rem !important;
            justify-content: center !important;
            max-width: 100% !important;
            overflow: visible !important;
          }
          .closed-icon-wrapper {
            padding: 0 !important;
            background: transparent !important;
            border: none !important;
          }
          .closed-icon-wrapper svg {
            width: 10px !important;
            height: 10px !important;
          }
          .icon-badge {
            display: flex !important;
            font-size: 0.55rem !important;
            width: 12px !important;
            height: 12px !important;
            min-width: 12px !important;
            top: -4px !important;
            right: -4px !important;
            background: #6b7280 !important;
            color: white !important;
            border: 1px solid #4b5563 !important;
          }
          .closed-icon-wrapper-more {
            font-size: 0.6rem !important;
            padding: 0 0.1rem !important;
          }

          /* Expanded Card Specifics */
          .moukeb-unified-text {
            font-size: 0.85rem !important; /* Even smaller font */
            font-weight: 700 !important;
          }
          .moukeb-unified-title {
            gap: 0.4rem !important;
          }
          .moukeb-unified-title > div[style*="border"] {
            font-size: 0.6rem !important; /* Even smaller service tags */
            padding: 0.15rem 0.3rem !important;
            border-radius: 6px !important;
            gap: 0.2rem !important;
          }
          .moukeb-unified-title > div[style*="border"] svg {
            width: 10px !important;
            height: 10px !important;
          }
          .moukeb-unified-block {
            padding: 0.8rem 0.5rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
        }

        /* Redesigned Card Layout overrides */
        .column-card {
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .column-card.expanded {
          flex-direction: column !important;
        }
        
        .card-top-row {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: stretch;
          min-height: 120px;
        }
        
        .col-number-block {
          background: rgba(0, 0, 0, 0.4);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 100px;
          border-right: 1px solid var(--border-color);
        }
        
        .smart-badges-container {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          justify-content: center;
        }
        
        .smart-badge {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        
        .badge-moukeb {
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(170, 0, 0, 0.2));
          border-color: rgba(255, 0, 0, 0.4);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .badge-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem;
          border-radius: 50%;
        }
        
        .badge-moukeb .badge-icon-wrapper svg {
          color: var(--accent-color);
        }
        
        .badge-service .badge-icon-wrapper svg {
          color: #fff;
        }
        
        .badge-text {
          font-size: 1.05rem;
          line-height: 1.4;
          color: #fff;
          font-weight: 700;
          margin-top: 0.2rem;
        }
        
        .col-details.smooth-expand {
          border-top: 1px solid var(--border-color);
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          background: rgba(255,255,255,0.03);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
        }
        
        .detail-icon {
          background: rgba(0,0,0,0.3);
          padding: 0.5rem;
          border-radius: 50%;
          color: var(--accent-color);
        }

        /* Unified Moukeb Block */
        .moukeb-unified-block {
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.15), rgba(170, 0, 0, 0.15));
          border: 1px solid rgba(255, 0, 0, 0.3);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          padding: 0.5rem 0.8rem;
          gap: 0.3rem;
        }
        
        .moukeb-unified-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0;
          background: transparent;
          border-bottom: none;
        }
        
        .moukeb-unified-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          flex-grow: 1;
        }
        
        .moukeb-unified-details {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.8rem;
          padding: 0;
          padding-right: 3.2rem;
        }
        
        .unified-detail-row {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.85);
        }
        
        .unified-detail-row svg {
          margin-top: 0;
          flex-shrink: 0;
        }
        
        .unified-services-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: center;
        }
        
        .unified-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          color: #fff;
        }
        
        .unified-note-text {
          color: var(--accent-color);
          font-weight: bold;
          font-size: 0.85rem;
        }

        
        .filter-pills-container {
          display: flex;
          gap: 0.8rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          width: 100%;
          scrollbar-width: none; /* Firefox */
        }
        
        .filter-pills-container::-webkit-scrollbar {
          display: none;
        }
        
        .filter-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 0.6rem 1rem;
          color: rgba(255,255,255,0.8);
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .filter-pill:hover {
          background: rgba(255,255,255,0.15);
          color: white;
        }
        
        .filter-pill.active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        }
        
        .filter-pill svg {
          width: 16px;
          height: 16px;
        }

        
        .inline-filter-btn {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .inline-filter-btn:hover {
          color: white;
          background: rgba(255,255,255,0.1);
        }
        
        .inline-filter-btn.active {
          color: var(--accent-color);
        }
        
        .inline-filter-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--accent-color);
          color: white;
          font-size: 0.65rem;
          font-weight: bold;
          min-width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .active-filters-banner {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          border-radius: 12px;
          padding: 0.6rem 1rem;
          width: 100%;
          flex-wrap: wrap;
        }
        
        .banner-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.8);
        }
        
        .banner-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          flex-grow: 1;
        }
        
        .banner-tag {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255,255,255,0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: white;
        }
        
        .banner-tag svg {
          width: 14px;
          height: 14px;
        }
        
        .clear-filters-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.85rem;
          font-family: inherit;
          font-weight: bold;
          text-decoration: underline;
        }
        
        .clear-filters-btn:hover {
          color: #f87171;
        }

        /* Updated Expand/Collapse logic */
        .card-top-row.is-closed {
          justify-content: center;
          align-items: center;
        }
        
        .card-top-row.is-closed .col-number-block {
          background: transparent;
          border-right: none;
          min-width: auto;
          width: 100%;
          padding: 2rem;
        }
        
        .card-top-row.is-closed .col-number {
          font-size: 3.5rem;
          color: white;
        }
        
        .card-top-row.is-expanded {
          justify-content: space-between;
        }
        
        .smart-badges-container {
          animation: fadeSlideIn 0.3s ease-out;
        }
        
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .col-closed-icons {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.8rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        
        
        .closed-icon-wrapper {
          position: relative;
        }
        
        .icon-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #6b7280;
          color: white;
          border: 1px solid #4b5563;
          font-size: 0.55rem;
          font-weight: bold;
          min-width: 13px;
          height: 13px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1px;
          z-index: 2;
        }

        .closed-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.25rem;
          border-radius: 50%;
          color: var(--accent-color);
          transition: all 0.3s ease;
        }
        
        .closed-icon-wrapper svg {
          width: 11px;
          height: 11px;
        }
        
        .closed-icon-wrapper-more {
          font-size: 0.7rem;
          font-weight: bold;
          color: #9ca3af;
          border: 1px solid #9ca3af;
          border-radius: 50%;
          padding: 0.15rem 0.35rem;
          margin-right: 0.3rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .unified-soft-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>




    </div>
  );
}
