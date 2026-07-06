import React, { useState, useEffect } from 'react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken
} from '../lib/firebase.ts';
import { User } from 'firebase/auth';
import {
  Shield,
  LayoutGrid,
  FileText,
  Calendar as CalendarIcon,
  Mail,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  ChevronRight,
  Database,
  Cloud,
  FileUp,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Booking {
  id: number;
  serviceName: string;
  scheduledAt: string;
  status: string;
  details: string;
  createdAt: string;
}

interface ActionLog {
  id: number;
  actionType: string;
  description: string;
  createdAt: string;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject?: string;
  from?: string;
}

export default function WorkspaceDashboard({ onBackToCorporate }: { onBackToCorporate: () => void }) {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'sql' | 'drive' | 'calendar' | 'gmail'>('sql');

  // Loading states
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [isLoadingGmail, setIsLoadingGmail] = useState(false);

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [gmailMessages, setGmailMessages] = useState<GmailMessage[]>([]);

  // Form states
  const [newBooking, setNewBooking] = useState({ serviceName: 'Auditoria de Cibersegurança', scheduledAt: '', details: '' });
  const [newFile, setNewFile] = useState({ name: 'oncyber_relatorio.txt', content: 'Relatório Técnico de Diagnóstico de Rede ONCYBER.' });
  const [newEvent, setNewEvent] = useState({ summary: 'ONCYBER Consultoria Técnica', date: '', time: '10:00' });
  const [newEmail, setNewEmail] = useState({ to: '', subject: 'ONCYBER - Solicitação de Suporte Técnico', body: 'Olá equipe de TI,\n\nGostaria de solicitar suporte para a infraestrutura de rede da minha empresa.' });

  // Status/Feedback messages
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Iframe detection state
  const [isInIframe, setIsInIframe] = useState(false);

  // Initialize auth
  useEffect(() => {
    setIsInIframe(window.self !== window.top);

    const unsubscribe = initAuth(
      async (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        // Sync user with SQL database
        await syncUserWithSql(currentUser);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Sync user with PostgreSQL Cloud SQL
  const syncUserWithSql = async (currentUser: User) => {
    try {
      const idToken = await currentUser.getIdToken();
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });
      // Fetch initial SQL data
      fetchSqlData(currentUser);
    } catch (err) {
      console.error('Erro ao sincronizar usuário no SQL:', err);
    }
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  // Fetch PostgreSQL data (Bookings and Audit Logs)
  const fetchSqlData = async (currentUser: User = user!) => {
    if (!currentUser) return;
    setIsLoadingBookings(true);
    setIsLoadingLogs(true);
    try {
      const idToken = await currentUser.getIdToken();
      const headers = { 'Authorization': `Bearer ${idToken}` };

      // Load bookings
      const bookingsRes = await fetch('/api/bookings', { headers });
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      }

      // Load SQL action logs
      const logsRes = await fetch('/api/logs', { headers });
      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData);
      }
    } catch (err) {
      console.error('Erro ao carregar dados SQL:', err);
      showFeedback('error', 'Erro ao sincronizar dados com o Cloud SQL.');
    } finally {
      setIsLoadingBookings(false);
      setIsLoadingLogs(false);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        showFeedback('success', `Autenticado com sucesso como ${result.user.email}`);
        await syncUserWithSql(result.user);
      }
    } catch (err: any) {
      console.error('Erro de login:', err);
      if (err?.code === 'auth/popup-closed-by-user' || err?.message?.includes('popup-closed-by-user')) {
        showFeedback('error', 'O popup de login foi bloqueado ou fechado pelo navegador. Por favor, use o botão "Abrir em Nova Aba" para autenticar-se com sucesso fora do iframe.');
      } else {
        showFeedback('error', `Falha na autenticação: ${err?.message || 'Erro desconhecido.'}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setDriveFiles([]);
      setCalendarEvents([]);
      setGmailMessages([]);
      setBookings([]);
      setLogs([]);
      showFeedback('success', 'Sessão encerrada com sucesso.');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Log workspace action to SQL
  const logWorkspaceActionToSql = async (actionType: string, description: string) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ actionType, description })
      });
      // Refresh local logs
      fetchSqlData();
    } catch (err) {
      console.error('Erro ao registrar log no banco:', err);
    }
  };

  // ==========================================
  // CLOUD SQL BOOKING OPERATIONS
  // ==========================================
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(newBooking)
      });

      if (res.ok) {
        showFeedback('success', 'Diagnóstico Técnico agendado com sucesso no Cloud SQL!');
        setNewBooking({ serviceName: 'Auditoria de Cibersegurança', scheduledAt: '', details: '' });
        fetchSqlData();
      } else {
        const errData = await res.json();
        showFeedback('error', errData.error || 'Erro ao criar agendamento.');
      }
    } catch (err) {
      console.error('Erro de agendamento:', err);
      showFeedback('error', 'Falha ao processar o agendamento.');
    }
  };

  const handleDeleteBooking = async (id: number) => {
    const confirmed = window.confirm('Deseja realmente cancelar este diagnóstico técnico? Os dados serão permanentemente excluídos do Cloud SQL.');
    if (!confirmed) return;

    try {
      const idToken = await user!.getIdToken();
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${idToken}` }
      });

      if (res.ok) {
        showFeedback('success', 'Agendamento cancelado com sucesso no Cloud SQL.');
        fetchSqlData();
      } else {
        showFeedback('error', 'Falha ao cancelar o agendamento.');
      }
    } catch (err) {
      console.error('Erro ao excluir agendamento:', err);
    }
  };

  // ==========================================
  // GOOGLE DRIVE API OPERATIONS
  // ==========================================
  const loadDriveFiles = async () => {
    if (!token) return;
    setIsLoadingDrive(true);
    try {
      const res = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType)', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDriveFiles(data.files || []);
      } else {
        showFeedback('error', 'Erro ao carregar arquivos do Google Drive. Verifique as permissões.');
      }
    } catch (err) {
      console.error('Erro Drive:', err);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleUploadToDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const metadata = {
        name: newFile.name,
        mimeType: 'text/plain'
      };

      const fileContent = newFile.content;
      const boundary = 'foo_bar_baz';
      const multipartBody =
        `\r\n--${boundary}\r\n` +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        `\r\n--${boundary}\r\n` +
        'Content-Type: text/plain\r\n\r\n' +
        fileContent +
        `\r\n--${boundary}--`;

      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      });

      if (res.ok) {
        showFeedback('success', `Arquivo "${newFile.name}" carregado com sucesso no Google Drive!`);
        await logWorkspaceActionToSql('Drive', `Criou o arquivo '${newFile.name}' no Google Drive`);
        setNewFile({ name: 'oncyber_relatorio.txt', content: '' });
        loadDriveFiles();
      } else {
        showFeedback('error', 'Erro ao fazer upload para o Drive.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDriveFile = async (fileId: string, fileName: string) => {
    const confirmed = window.confirm(`Deseja realmente remover o arquivo "${fileName}" do seu Google Drive? Esta ação excluirá os dados com permissão.`);
    if (!confirmed) return;

    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        showFeedback('success', `Arquivo removido com sucesso.`);
        await logWorkspaceActionToSql('Drive', `Excluiu o arquivo '${fileName}' no Google Drive`);
        loadDriveFiles();
      } else {
        showFeedback('error', 'Erro ao excluir o arquivo do Google Drive.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // GOOGLE CALENDAR API OPERATIONS
  // ==========================================
  const loadCalendarEvents = async () => {
    if (!token) return;
    setIsLoadingCalendar(true);
    try {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCalendarEvents(data.items || []);
      } else {
        showFeedback('error', 'Erro ao buscar eventos do Google Agenda.');
      }
    } catch (err) {
      console.error('Erro Agenda:', err);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newEvent.date) return;

    try {
      const startDateTime = `${newEvent.date}T${newEvent.time}:00`;
      // End time 1 hour later
      const endHour = parseInt(newEvent.time.split(':')[0]) + 1;
      const endDateTime = `${newEvent.date}T${endHour.toString().padStart(2, '0')}:${newEvent.time.split(':')[1]}:00`;

      const eventBody = {
        summary: newEvent.summary,
        description: 'Reunião de Diagnóstico de TI & Segurança pela ONCYBER',
        start: { dateTime: startDateTime, timeZone: 'Africa/Maputo' },
        end: { dateTime: endDateTime, timeZone: 'Africa/Maputo' }
      };

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventBody)
      });

      if (res.ok) {
        const created = await res.json();
        showFeedback('success', `Compromisso agendado com sucesso no Google Agenda!`);
        await logWorkspaceActionToSql('Calendar', `Agendou compromisso '${newEvent.summary}' para o dia ${newEvent.date}`);
        setNewEvent({ summary: 'ONCYBER Consultoria Técnica', date: '', time: '10:00' });
        loadCalendarEvents();
      } else {
        showFeedback('error', 'Erro ao agendar compromisso no Google Agenda.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCalendarEvent = async (eventId: string, summary: string) => {
    const confirmed = window.confirm(`Deseja realmente excluir o evento "${summary}" do Google Agenda?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        showFeedback('success', `Evento removido com sucesso.`);
        await logWorkspaceActionToSql('Calendar', `Removeu o compromisso '${summary}' do Google Agenda`);
        loadCalendarEvents();
      } else {
        showFeedback('error', 'Erro ao excluir compromisso do Google Agenda.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // GMAIL API OPERATIONS
  // ==========================================
  const loadGmailMessages = async () => {
    if (!token) return;
    setIsLoadingGmail(true);
    try {
      const res = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=8', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const messagesList = data.messages || [];

        // Fetch detailed snippet & subject for each message
        const detailedMessages = await Promise.all(
          messagesList.map(async (msg: any) => {
            const detailRes = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (detailRes.ok) {
              const details = await detailRes.json();
              const headers = details.payload.headers;
              const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'Sem Assunto';
              const from = headers.find((h: any) => h.name === 'From')?.value || 'Desconhecido';
              return {
                id: msg.id,
                threadId: msg.threadId,
                snippet: details.snippet,
                subject,
                from
              };
            }
            return { id: msg.id, threadId: msg.threadId, snippet: 'Sem detalhes' };
          })
        );

        setGmailMessages(detailedMessages);
      } else {
        showFeedback('error', 'Erro ao carregar mensagens do Gmail.');
      }
    } catch (err) {
      console.error('Erro Gmail:', err);
    } finally {
      setIsLoadingGmail(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newEmail.to || !newEmail.subject || !newEmail.body) return;

    try {
      // Gmail API expects Base64 URL encoded raw email string
      const rawEmail = [
        `To: ${newEmail.to}`,
        `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(newEmail.subject)))}?=`,
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        newEmail.body
      ].join('\r\n');

      const encodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const res = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: encodedEmail })
      });

      if (res.ok) {
        showFeedback('success', `E-mail enviado com sucesso via Gmail!`);
        await logWorkspaceActionToSql('Gmail', `Enviou um e-mail para '${newEmail.to}' com o assunto '${newEmail.subject}'`);
        setNewEmail({ to: '', subject: 'ONCYBER - Solicitação de Suporte Técnico', body: 'Olá equipe de TI,\n\nGostaria de solicitar suporte.' });
        loadGmailMessages();
      } else {
        showFeedback('error', 'Erro ao enviar e-mail via Gmail API.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load API resources when tabs switch
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'drive') loadDriveFiles();
    if (activeTab === 'calendar') loadCalendarEvents();
    if (activeTab === 'gmail') loadGmailMessages();
  }, [activeTab, token]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Cloud className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-black tracking-tight leading-none">
              ON<span className="text-blue-500">CYBER</span> CLOUD HUB
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">Workspace Integration Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCorporate}
            className="text-xs font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all cursor-pointer border border-slate-700"
          >
            Voltar ao Site Corporativo
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-4 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-900/40 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative z-10">
        
        {/* Connection status banner */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs text-slate-400 font-mono">ESTADO DO BANCO DE DADOS (PostgreSQL Cloud SQL)</p>
              <p className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-emerald-400" />
                Cloud SQL Conectado com Sucesso via Proxy
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${user ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
            <div>
              <p className="text-xs text-slate-400 font-mono">AUTENTICAÇÃO DO GOOGLE WORKSPACE</p>
              <p className="text-sm font-bold text-slate-200">
                {user ? `Conectado como ${user.email}` : 'Conexão Necessária'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Feedback Notifications */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl flex items-center gap-3 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}
            >
              {feedback.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              <span className="text-xs font-semibold">{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {needsAuth ? (
          /* Authentication Screen */
          <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto py-12 text-center space-y-6">
            <div className="h-16 w-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-slate-100">Área Restrita: ONCYBER Cloud Hub</h2>
              <p className="text-sm text-slate-400">
                Para gerenciar agendamentos de auditorias no Cloud SQL e integrar seus arquivos, agendas e e-mails corporativos, faça login com a sua conta Google.
              </p>
            </div>

            {isInIframe && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-left text-xs space-y-3 text-amber-300 w-full shadow-lg">
                <p className="font-bold flex items-center gap-1.5 text-amber-400 text-sm">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                  Restrição de Segurança do Navegador (Iframe)
                </p>
                <p className="leading-relaxed text-slate-300">
                  Os navegadores modernos impedem que popups de autenticação (Google Login) se comuniquem com sites incorporados em frames (como esta janela do AI Studio).
                </p>
                <p className="leading-relaxed font-bold text-amber-200">
                  Para autenticar-se com sucesso, abra a aplicação diretamente em uma nova aba:
                </p>
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-xl font-bold transition-all w-full mt-1 cursor-pointer shadow-md shadow-amber-500/10 active:scale-98"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir ONCYBER em Nova Aba ↗
                </a>
              </div>
            )}

            {/* Official GSI Styled Material Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-3 w-full shadow-lg shadow-white/5 cursor-pointer hover:shadow-white/10 active:scale-98 transition-all disabled:opacity-55"
            >
              {isLoggingIn ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              ) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              <span>Entrar com o Google</span>
            </button>
          </div>
        ) : (
          /* Dashboard Workspace Layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-2.5 flex flex-col gap-1">
                <p className="text-[10px] text-slate-500 font-mono font-bold px-3 py-2 tracking-wider uppercase">Ferramentas Disponíveis</p>
                
                <button
                  onClick={() => setActiveTab('sql')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'sql'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Diagnósticos (Cloud SQL)</span>
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setActiveTab('drive')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'drive'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Relatórios (Google Drive)</span>
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'calendar'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Google Agenda (Reuniões)</span>
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setActiveTab('gmail')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'gmail'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Suporte Corporativo (Gmail)</span>
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Action logs sidebar widget */}
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Histórico do Hub</span>
                  <button onClick={() => fetchSqlData()} className="text-[10px] text-blue-400 font-bold hover:underline cursor-pointer">
                    Atualizar
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {logs.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">Nenhuma ação recente registrada.</p>
                  ) : (
                    logs.map((log) => (
                      <div key={log.id} className="border-l border-slate-800 pl-2.5 py-0.5 space-y-0.5">
                        <span className="inline-flex items-center gap-1 rounded-sm bg-slate-800 text-slate-400 px-1.5 py-0.5 text-[9px] font-mono uppercase">
                          {log.actionType}
                        </span>
                        <p className="text-[11px] text-slate-300 leading-tight">{log.description}</p>
                        <p className="text-[9px] text-slate-500 font-mono">{new Date(log.createdAt).toLocaleTimeString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Dashboard Workspace Panels */}
            <div className="lg:col-span-3 space-y-6">
              
              <AnimatePresence mode="wait">
                
                {/* 1. CLOUD SQL AGENDAMENTOS */}
                {activeTab === 'sql' && (
                  <motion.div
                    key="sql"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {/* Left: Schedule Audit Form */}
                    <div className="md:col-span-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                        <Plus className="h-4 w-4 text-blue-400" />
                        Solicitar Diagnóstico
                      </h3>
                      
                      <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Serviço Pretendido</label>
                          <select
                            value={newBooking.serviceName}
                            onChange={(e) => setNewBooking({ ...newBooking, serviceName: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          >
                            <option value="Auditoria de Cibersegurança">Auditoria de Cibersegurança</option>
                            <option value="Consultoria em Cloud Computing">Consultoria em Cloud Computing</option>
                            <option value="Configuração de Servidores">Configuração de Servidores</option>
                            <option value="Suporte Técnico Especializado">Suporte Técnico Especializado</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Data Escolhida</label>
                          <input
                            type="date"
                            required
                            value={newBooking.scheduledAt}
                            onChange={(e) => setNewBooking({ ...newBooking, scheduledAt: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Observações adicionais</label>
                          <textarea
                            rows={3}
                            placeholder="Descreva brevemente sua infraestrutura..."
                            value={newBooking.details}
                            onChange={(e) => setNewBooking({ ...newBooking, details: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Agendar via Cloud SQL
                        </button>
                      </form>
                    </div>

                    {/* Right: Bookings List */}
                    <div className="md:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                          <Database className="h-4 w-4 text-emerald-400" />
                          Agendamentos de Auditorias (PostgreSQL Cloud SQL)
                        </h3>
                        <button onClick={() => fetchSqlData()} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                          <RefreshCw className={`h-4 w-4 ${isLoadingBookings ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {isLoadingBookings ? (
                        <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                      ) : bookings.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-500">Nenhum diagnóstico técnico foi agendado ainda no Cloud SQL.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {bookings.map((b) => (
                            <div key={b.id} className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-start justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-bold text-slate-100">{b.serviceName}</span>
                                  <span className="inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                                    {b.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400">Agendado para: <strong className="text-slate-300">{b.scheduledAt}</strong></p>
                                {b.details && <p className="text-[11px] text-slate-500 italic leading-relaxed">{b.details}</p>}
                                <p className="text-[9px] text-slate-600 font-mono">Solicitado em {new Date(b.createdAt).toLocaleDateString()}</p>
                              </div>

                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="text-slate-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                                title="Cancelar Agendamento"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 2. GOOGLE DRIVE RELATÓRIOS */}
                {activeTab === 'drive' && (
                  <motion.div
                    key="drive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {/* Left: Create File */}
                    <div className="md:col-span-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                        <FileUp className="h-4 w-4 text-blue-400" />
                        Salvar Novo Relatório
                      </h3>

                      <form onSubmit={handleUploadToDrive} className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Nome do Arquivo (.txt)</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: relatorio_ti_empresa.txt"
                            value={newFile.name}
                            onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Conteúdo do Arquivo</label>
                          <textarea
                            rows={4}
                            required
                            placeholder="Insira as observações técnicas..."
                            value={newFile.content}
                            onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Salvar no Google Drive
                        </button>
                      </form>
                    </div>

                    {/* Right: Files list */}
                    <div className="md:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-400" />
                          Arquivos no Google Drive (Com Permissão)
                        </h3>
                        <button onClick={loadDriveFiles} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                          <RefreshCw className={`h-4 w-4 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {isLoadingDrive ? (
                        <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                      ) : driveFiles.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-500">Nenhum arquivo encontrado no Google Drive.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {driveFiles.map((file) => (
                            <div key={file.id} className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                  <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-200">{file.name}</p>
                                  <p className="text-[10px] text-slate-500 font-mono">{file.mimeType}</p>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteDriveFile(file.id, file.name)}
                                className="text-slate-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                                title="Excluir Arquivo"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. GOOGLE CALENDAR AGENDA */}
                {activeTab === 'calendar' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {/* Left: Schedule event */}
                    <div className="md:col-span-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                        <Plus className="h-4 w-4 text-blue-400" />
                        Agendar Compromisso
                      </h3>

                      <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Título da Reunião</label>
                          <input
                            type="text"
                            required
                            value={newEvent.summary}
                            onChange={(e) => setNewEvent({ ...newEvent, summary: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-slate-400 font-medium">Data</label>
                            <input
                              type="date"
                              required
                              value={newEvent.date}
                              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-slate-200 outline-hidden focus:border-blue-500 text-xs"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-slate-400 font-medium">Horário</label>
                            <input
                              type="time"
                              required
                              value={newEvent.time}
                              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-slate-200 outline-hidden focus:border-blue-500 text-xs"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Salvar no Google Agenda
                        </button>
                      </form>
                    </div>

                    {/* Right: Events list */}
                    <div className="md:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-blue-400" />
                          Próximos Compromissos (Google Agenda)
                        </h3>
                        <button onClick={loadCalendarEvents} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                          <RefreshCw className={`h-4 w-4 ${isLoadingCalendar ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {isLoadingCalendar ? (
                        <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                      ) : calendarEvents.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-500">Nenhum evento agendado para os próximos dias.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {calendarEvents.map((evt) => {
                            const eventTime = evt.start?.dateTime ? new Date(evt.start.dateTime).toLocaleString('pt-MZ') : evt.start?.date;
                            return (
                              <div key={evt.id} className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-slate-100">{evt.summary}</p>
                                  <p className="text-[10px] text-slate-400 font-mono">Data/Hora: {eventTime}</p>
                                </div>

                                <button
                                  onClick={() => handleDeleteCalendarEvent(evt.id, evt.summary)}
                                  className="text-slate-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                                  title="Remover Evento"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 4. GMAIL SUPORTE CORPORATIVO */}
                {activeTab === 'gmail' && (
                  <motion.div
                    key="gmail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {/* Left: Send Email */}
                    <div className="md:col-span-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                        <Send className="h-4 w-4 text-blue-400" />
                        Enviar Mensagem
                      </h3>

                      <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Destinatário (E-mail)</label>
                          <input
                            type="email"
                            required
                            placeholder="suporte@oncyber.co.mz"
                            value={newEmail.to}
                            onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Assunto</label>
                          <input
                            type="text"
                            required
                            value={newEmail.subject}
                            onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-400 font-medium">Mensagem</label>
                          <textarea
                            rows={4}
                            required
                            value={newEmail.body}
                            onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-hidden focus:border-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Enviar E-mail via Gmail
                        </button>
                      </form>
                    </div>

                    {/* Right: Inbox emails list */}
                    <div className="md:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          Mensagens Recentes do Gmail (Inbox)
                        </h3>
                        <button onClick={loadGmailMessages} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                          <RefreshCw className={`h-4 w-4 ${isLoadingGmail ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {isLoadingGmail ? (
                        <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                      ) : gmailMessages.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-500">Nenhum e-mail recente encontrado no Gmail.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 max-h-[480px] overflow-y-auto pr-1">
                          {gmailMessages.map((msg) => (
                            <div key={msg.id} className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-xs font-bold text-slate-200">{msg.subject}</p>
                                  <p className="text-[10px] text-slate-400 font-medium">De: {msg.from}</p>
                                </div>
                                <span className="text-[9px] font-mono text-slate-600 uppercase">id: {msg.id}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-900/60 font-medium">
                                {msg.snippet}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center mt-auto">
        <p className="text-xs text-slate-500">
          &copy; 2026 ONCYBER Tecnologia e TI. Integrado com Google Workspace APIs e Banco PostgreSQL Cloud SQL.
        </p>
      </footer>
    </div>
  );
}
