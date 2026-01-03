import React, { useState, useEffect } from "react";
import "../styles/MessagePage.css";
// import "../styles/DashboardPage.css"; // Import standard navbar styles REMOVED

interface User {
    email: string;
    fullName: string;
}

interface MessagePageProps {
    user: User;
    onNavigateToDashboard: () => void;
    onNavigateToMatches: () => void;
    onNavigateToAnalytics: () => void;
    onNavigateToCreateProfile: () => void;
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onLogout: () => void;
}

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    imageUrl?: string;
    isRead: boolean;
}

interface Contact {
    id: string;
    name: string;
    avatar: string; // URL or placeholder
    status: "online" | "offline";
    lastMessage: string;
    lastMessageTime: string;
    unreadCount?: number;
    email?: string;
}

// Mock Data
const MOCK_CONTACTS: Contact[] = [
    {
        id: "1",
        name: "Nathan Hale",
        avatar: "https://i.pravatar.cc/150?u=1",
        status: "online",
        lastMessage: "There you go :)",
        lastMessageTime: "14:59",
        unreadCount: 0,
        email: "nathanhale@koalaui.com"
    },
    {
        id: "2",
        name: "Xavier Ross",
        avatar: "https://i.pravatar.cc/150?u=2",
        status: "offline",
        lastMessage: "You: I'd like to report ongoing noise...",
        lastMessageTime: "1d",
        unreadCount: 0,
    },
    {
        id: "3",
        name: "Dominic Scott",
        avatar: "https://i.pravatar.cc/150?u=3",
        status: "online",
        lastMessage: "There have been several instances...",
        lastMessageTime: "3d",
        unreadCount: 2,
    },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    "1": [
        {
            id: "m1",
            senderId: "1",
            text: "There you go :)",
            timestamp: "14:59",
            isRead: true,
        },
        {
            id: "m1-img",
            senderId: "1",
            text: "",
            imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            timestamp: "14:59",
            isRead: true
        },
        {
            id: "m2",
            senderId: "me",
            text: "Woah 🤯, this looks slick! Did you design it yourself?",
            timestamp: "14:59",
            isRead: true,
        },
        {
            id: "m3",
            senderId: "1",
            text: "Yep, spent all weekend on Figma 💻. Still pretty rough though.",
            timestamp: "14:59",
            isRead: true,
        },
    ],
    "2": [
        {
            id: "m2-1",
            senderId: "2",
            text: "Hey, can we talk about the noise?",
            timestamp: "Yesterday",
            isRead: true,
        }
    ],
    "3": [],
};

export const MessagePage: React.FC<MessagePageProps> = ({ user, onNavigateToDashboard, onNavigateToMatches, onNavigateToAnalytics, onLogout, onNavigateToCreateProfile, onNavigateToSetting, onNavigateToRedFlagAlert }) => {
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedContactId) {
            setMessages(MOCK_MESSAGES[selectedContactId] || []);
        }
    }, [selectedContactId]);

    const handleSendMessage = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: "me",
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
        };

        setMessages([...messages, newMessage]);
        setInputText("");
    };

    const activeContact = MOCK_CONTACTS.find(c => c.id === selectedContactId);

    return (
        <div className="dashboard-container message-page">
            {/* Top Navbar - Matches DashboardPage exactly */}
            <nav className="message-navbar">
                <div className="nav-left">
                    <div className="logo-section">
                        <span className="logo-text">RoomEase</span>
                    </div>
                </div>

                <div className="nav-center">
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToDashboard(); }}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToCreateProfile(); }}
                    >
                        Create Profile
                    </a>
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => { e.preventDefault(); onNavigateToMatches(); }}
                    >
                        Match
                    </a>
                    <a href="#" className="nav-link">
                        Map
                    </a>
                    <a href="#" className="nav-link">
                        Listing
                    </a>
                    {/* Active Link - 'active' class removed per user request */}
                    <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        Message
                    </a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                        Red Flag Alert
                    </a>
                </div>

                <div className="nav-right">
                    <a href="#" className="nav-link" style={{ marginRight: '20px' }} onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>
                        Setting
                    </a>
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="mp-content-container" style={{ background: '#fff', height: 'calc(100vh - 64px)' }}>
                {/* Sidebar - Always visible on left */}
                <div className="mp-sidebar" style={{ width: '350px', borderRight: '1px solid #e5e7eb', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="mp-sidebar-header">
                        <div className="mp-search-container">
                            <div style={{ position: 'relative', width: '100%' }}>
                                <i className="bi bi-search" style={{ position: 'absolute', left: '10px', top: '10px', color: '#888' }}></i>
                                <input
                                    type="text"
                                    className="mp-search-input"
                                    placeholder="Search by title, user..."
                                    style={{ paddingLeft: '35px' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mp-tabs">
                            <div className="mp-tab active">All</div>
                            <div className="mp-tab">Accepted</div>
                            <div className="mp-tab">Denied</div>
                            <div className="mp-tab">Archived</div>
                        </div>
                    </div>

                    <div className="mp-contact-list">
                        {MOCK_CONTACTS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((contact) => (
                            <div
                                key={contact.id}
                                className={`mp-contact-item ${contact.id === selectedContactId ? 'selected' : ''}`}
                                onClick={() => setSelectedContactId(contact.id)}
                            >
                                <div className="mp-avatar-container">
                                    <img src={contact.avatar} alt={contact.name} className="mp-avatar" />
                                    <span className={`mp-status-indicator ${contact.status}`} />
                                </div>
                                <div className="mp-contact-info">
                                    <div className="mp-contact-header">
                                        <span className="mp-contact-name">{contact.name}</span>
                                        <span className="mp-last-msg-time">{contact.lastMessageTime}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="mp-last-msg-preview">{contact.lastMessage}</div>
                                        {contact.unreadCount && contact.unreadCount > 0 ? (
                                            <div className="mp-unread-dot" />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mp-main-area" style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {!selectedContactId ? (
                        /* Placeholder View when no chat is selected */
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: '#9ca3af',
                            backgroundColor: '#f9fafb'
                        }}>
                            <i className="bi bi-chat-square-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
                            <h3>Select a conversation</h3>
                            <p>Choose a contact from the left sidebar to start chatting.</p>
                        </div>
                    ) : (
                        /* Active Chat View - Formatted as per user request */
                        <div className="mp-chat-area">
                            <div className="mp-chat-header">
                                {activeContact && (
                                    <>
                                        <div className="mp-chat-header-user">
                                            {/* Back Button Removed as per request */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <img src={activeContact.avatar} alt={activeContact.name} className="mp-avatar" style={{ width: '40px', height: '40px' }} />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div className="mp-header-name-row">
                                                        <span className="mp-header-name">{activeContact.name}</span>
                                                        {/* Email REMOVED as per request */}
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: '#31a24c' }}>Online</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mp-header-actions">
                                            <i className="bi bi-flag mp-header-icon" title="Report"></i>
                                            {/* Other icons (Shop, More) REMOVED as per request 'just keep report' */}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mp-messages-list">
                                {messages.map((msg) => {
                                    const isMe = msg.senderId === "me";
                                    const avatarUrl = isMe
                                        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0D8ABC&color=fff`
                                        : (activeContact?.avatar || "");

                                    return (
                                        <div key={msg.id} className={`mp-message-row ${isMe ? 'sent' : 'received'}`}>
                                            {/* Avatar Column */}
                                            <div className="mp-msg-avatar-col">
                                                <img src={avatarUrl} alt="Avatar" className="mp-msg-avatar-small" />
                                            </div>

                                            <div className="mp-msg-block">
                                                {/* Bubble */}
                                                <div className="mp-msg-bubble">
                                                    {msg.imageUrl && (
                                                        <div style={{ marginBottom: msg.text ? '0.5rem' : '0' }}>
                                                            <img src={msg.imageUrl} alt="Attachment" style={{ maxWidth: '100%', borderRadius: '8px', display: 'block' }} />
                                                        </div>
                                                    )}
                                                    {msg.text && (
                                                        <div>{msg.text}</div>
                                                    )}
                                                    <div className="mp-msg-time-footer">
                                                        {msg.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mp-input-area">
                                <div className="mp-input-wrapper">
                                    <i className="bi bi-paperclip mp-input-icon"></i>
                                    <input
                                        type="text"
                                        className="mp-chat-input"
                                        placeholder="Type a message..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <i className="bi bi-emoji-smile mp-input-icon"></i>
                                </div>
                                <button className="mp-send-btn-custom" onClick={() => handleSendMessage()}>
                                    <i className="bi bi-send-fill"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
