import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import Navbar from "../Layouts/Navbar";
import axios from 'axios';

function Notifications({ notifications }) {
    // Function to mark a notification as read
    const markAsRead = async (notificationId) => {
        try {
            await axios.post(`/notifications/${notificationId}/mark-as-read`);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Handle clicking on a job order link
    const handleJobOrderClick = (notificationId) => {
        markAsRead(notificationId);
    };

    return (
        <div className="ps-3 pe-3">
            <div>
                <h1 className="d-inline">Notifications | </h1>
                <h1 className="d-inline fw-light">Job Order Updates</h1>
                <hr />
            </div>

            <div className="mt-3">
                <div className="notifications-container neumorphic-container p-4">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} 
                                className={`notification-card fade-in hover-lift mb-4 ${!notification.read_at ? 'unread' : ''}`}
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
                                                        {notification.title}
                                                        {notification.job_order && (
                                                            <span className={`status-badge ms-3 status-${notification.job_order.status.toLowerCase()}`}>
                                                                {notification.job_order.status}
                                                            </span>
                                                        )}
                                                    </h5>
                                                    <span className="notification-date">
                                                        <i className="bi bi-calendar3 me-2"></i>
                                                        {moment(notification.created_at).fromNow()}
                                                    </span>
                                                </div>

                                                {notification.job_order && (
                                                    <div className="order-info mb-3">
                                                        <div className="info-item">
                                                            <i className="bi bi-file-earmark-text me-2 text-warning"></i>
                                                            <span className="fw-bold">Job Order #{notification.job_order.id}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="message-box mb-3">
                                                    <p className="mb-0">{notification.message}</p>
                                                </div>

                                                {notification.job_order && (
                                                    <div className="action-buttons">
                                                        <Link 
                                                            href={`/jobOrder/${notification.job_order.id}`}
                                                            className="btn btn-details"
                                                            onClick={() => handleJobOrderClick(notification.id)}
                                                        >
                                                            <i className="bi bi-arrow-right-circle me-2"></i>
                                                            View Job Order
                                                        </Link>
                                                    </div>
                                                )}
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

// Add some CSS for unread notifications
const styles = `
    .notification-card.unread {
        border-left: 4px solid #007bff;
        background-color: rgba(0, 123, 255, 0.05);
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
