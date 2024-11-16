import React, { useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import moment from 'moment';
import Navbar from "../Layouts/Navbar";
import axios from 'axios';

function Notifications({ notifications }) {
    // Function to mark a notification as read and update the count
    const markAsRead = async (notificationId) => {
        try {
            await axios.post(`/notifications/${notificationId}/mark-as-read`);
            // Immediately trigger a count update in the Navbar
            const countResponse = await axios.get('/notifications/unread-count');
            // Dispatch a custom event that Navbar will listen for
            window.dispatchEvent(new CustomEvent('updateNotificationCount', {
                detail: { count: countResponse.data.count }
            }));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Handle clicking on a job order link
    const handleJobOrderClick = async (notificationId) => {
        await markAsRead(notificationId);
    };

    // Add this new function
    const handleMarkAllAsRead = async () => {
        try {
            // Get the CSRF token from the meta tag
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            
            await axios.post('/notifications/mark-all-as-read', {}, {
                headers: {
                    'X-CSRF-TOKEN': token
                }
            });

            // Update the notification count
            const countResponse = await axios.get('/notifications/unread-count');
            window.dispatchEvent(new CustomEvent('updateNotificationCount', {
                detail: { count: countResponse.data.count }
            }));

            // Use Inertia router to refresh the page
            router.reload();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            // Optionally show an error message to the user
            alert('Failed to mark notifications as read. Please try again.');
        }
    };

    return (
        <div className="ps-3 pe-3">
            <div>
                <h1 className="d-inline">Notifications | </h1>
                <h1 className="d-inline fw-light">Job Order Updates</h1>
                <hr />
            </div>

            <div className="mt-3">
                {notifications.some(notification => !notification.read_at) && (
                    <div className="text-end mb-3 fade-in-delayed">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="btn btn-light mark-all-button"
                        >
                            <i className="bi bi-check2-all me-2"></i>
                            Mark all as read
                        </button>
                    </div>
                )}
                
                <div className="notifications-container neumorphic-container p-4">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} 
                                className={`notification-card fade-in hover-lift mb-4 ${!notification.read_at ? 'unread' : ''} ${notification.job_order?.status.toLowerCase() === 'completed' ? 'completed' : ''}`}
                            >
                                <div className="card-body p-4">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <div className="notification-icon-wrapper">
                                                <i className="bi bi-bell-fill text-warning"></i>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="notification-details">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h5 className="notification-title mb-0">
                                                        Job Order #{notification.job_order?.id}
                                                    </h5>
                                                    <span className="notification-date">
                                                        <i className="bi bi-calendar3 me-2"></i>
                                                        {moment(notification.created_at).fromNow()}
                                                    </span>
                                                </div>

                                                <div className="d-flex align-items-center mb-3">
                                                    <span className="me-2">Current Status:</span>
                                                    <span className={`status-badge status-${notification.job_order?.status.toLowerCase()}`}>
                                                        {notification.job_order?.status}
                                                    </span>
                                                </div>

                                                <div className="message-box mb-3">
                                                    <p className="mb-0">
                                                        Your job order #{notification.job_order?.id} status has been updated to{' '}
                                                        <span className={`fw-bold text-${notification.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                                            {notification.status}
                                                        </span>
                                                        {notification.message.includes('by') ? ' by' + notification.message.split('by')[1] : ''}
                                                    </p>
                                                </div>

                                                <div className="action-buttons">
                                                    <Link 
                                                        href={`/jobOrder/${notification.job_order?.id}`}
                                                        className="btn btn-details"
                                                        onClick={() => handleJobOrderClick(notification.id)}
                                                    >
                                                        <i className="bi bi-arrow-right-circle me-2"></i>
                                                        View Job Order
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state text-center p-5 fade-in">
                            <i className="bi bi-bell-slash text-warning fs-1 mb-3"></i>
                            <h4>No Notifications</h4>
                            <p className="text-muted">You'll be notified here when there are updates to your job orders.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Update the styles constant
const styles = `
    .notification-card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: all 0.3s ease;
        border-left: 4px solid transparent; /* Add transparent border by default */
    }

    /* Unread notification styles - higher specificity */
    .notification-card.unread {
        border-left: 4px solid #007bff !important; /* Use !important to ensure it takes precedence */
        background-color: rgba(0, 123, 255, 0.05);
    }

    /* Completed notification styles */
    .notification-card.completed {
        background: linear-gradient(145deg, #f8f9fa, #e9ecef);
        border: 1px solid #dee2e6;
        opacity: 0.85;
        border-left: 4px solid transparent; /* Reset left border for completed cards */
    }

    .notification-card.completed.unread {
        border-left: 4px solid #007bff !important; /* Ensure unread border shows even on completed cards */
    }

    .notification-card.completed:hover {
        opacity: 1;
        background: linear-gradient(145deg, #f8f9fa, #f1f3f5);
    }

    .notification-card.completed .notification-icon-wrapper {
        background-color: #e9ecef;
    }

    .notification-card.completed .notification-date {
        color: #6c757d;
    }

    .mark-all-button {
        background: linear-gradient(145deg, #ffffff, #f8f9fa);
        border: 1px solid #dee2e6;
        border-radius: 20px;
        padding: 8px 16px;
        font-size: 0.9rem;
        color: #6c757d;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .mark-all-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background: linear-gradient(145deg, #f8f9fa, #e9ecef);
        color: #495057;
    }

    .mark-all-button:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .fade-in-delayed {
        animation: fadeIn 0.5s ease-out forwards;
        animation-delay: 0.2s;
        opacity: 0;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

Notifications.layout = (page) => <Navbar>{page}</Navbar>;
export default Notifications;
