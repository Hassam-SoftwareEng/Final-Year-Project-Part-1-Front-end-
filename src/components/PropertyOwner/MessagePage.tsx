import React, { useState, useEffect } from "react";
import { Bell, Home } from 'lucide-react';
import "../../styles/PropertyOwner/MessagePage.css";

interface User {
    email: string;
    fullName: string;
}

interface MessagePageProps {
    user: User;
    onNavigateToDashboard: () => void;
    onNavigateToMatches?: () => void; // Optional for owner
    onNavigateToAnalytics?: () => void; // Optional for owner
    onNavigateToCreateProfile?: () => void; // Optional for owner
    onNavigateToSetting: () => void;
    onNavigateToRedFlagAlert: () => void;
    onNavigateToMap: () => void;
    onNavigateToListing: () => void;
    onNavigateToNotification?: () => void;
    onNavigateToHome?: () => void;
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

export const MessagePage: React.FC<MessagePageProps> = ({
    user,
    onNavigateToDashboard,
    onNavigateToListing,
    onNavigateToNotification,
    onNavigateToMap,
    onNavigateToSetting,
    onNavigateToRedFlagAlert,
    onNavigateToHome,
    onLogout
}) => {
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const handleHomeNavigation = onNavigateToHome || onNavigateToDashboard;

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
            {/* Navbar (Bootstrap Standardized) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top px-3">
                <div className="container-fluid">
                    {/* Logo Section */}
                    <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}>
                        <Home className="text-primary" size={24} style={{ color: '#14919B' }} />
                        <span className="fw-bold" style={{ color: '#14919B', fontSize: '1.25rem' }}>RoomEase</span>
                    </a>

                    {/* Toggle Button for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNavbar" aria-controls="dashboardNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Content */}
                    <div className="collapse navbar-collapse" id="dashboardNavbar">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigateToMap(); }}
                                >
                                    Map
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link fw-medium"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigateToListing(); }}
                                >
                                    Listing
                                </a>
                            </li>
                            {onNavigateToRedFlagAlert && (
                                <li className="nav-item">
                                    <a className="nav-link fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToRedFlagAlert(); }}>
                                        Red Flag Alert
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            {onNavigateToSetting && (
                                <a className="nav-link text-secondary fw-medium" href="#" onClick={(e) => { e.preventDefault(); onNavigateToSetting(); }}>Setting</a>
                            )}
                            {onNavigateToNotification && (
                                <button
                                    className="btn btn-link text-secondary p-0 border-0"
                                    onClick={(e) => { e.preventDefault(); onNavigateToNotification(); }}
                                >
                                    <Bell size={20} />
                                </button>
                            )}
                            <button className="btn-standard" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
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
            <footer className="footer">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoomEase. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
