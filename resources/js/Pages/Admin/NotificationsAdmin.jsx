import React from 'react';
import { Head } from '@inertiajs/react';
import AdminNavBar from '@/Layouts/AdminNavBar';
import axios from 'axios';
import moment from 'moment';

function NotificationsAdmin({ notifications }) {
    const handleClick = async (notification) => {
        try {
            // Mark as read
            await axios.post(`/admin/notifications/${notification.id}/mark-as-read`);
            
            // Redirect to the job order view page
            if (notification.job_order) {
                window.location.href = `/admin/showJobOrder/${notification.job_order.id}`;
            }
            
            // Update notification count
            window.dispatchEvent(new CustomEvent('updateNotificationCount'));
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/admin/notifications/mark-all-as-read');
            // Refresh the page to show updated state
            window.location.reload();
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    return (
        <>
            <Head title="Notifications" />
            <div className="ps-3 pe-3">
                <div>
                    <h1 className="d-inline">Notifications | </h1>
                    <h1 className="d-inline fw-light">Job Order Updates</h1>
                    <hr />
                </div>

                <div className="mt-3">
                    {notifications?.length > 0 && (
                        <div className="text-end mb-3 fade-in-delayed">
                            <button
                                onClick={markAllAsRead}
                                className="btn btn-light mark-all-button"
                            >
                                <i className="bi bi-check2-all me-2"></i>
                                Mark all as read
                            </button>
                        </div>
                    )}

                    <div className="notifications-container neumorphic-container p-4">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={notification.id}
                                    className={`notification-card fade-in hover-lift mb-4 ${!notification.read_at ? 'unread' : ''} ${notification.job_order?.status.toLowerCase() === 'completed' ? 'completed' : ''}`}
                                    onClick={() => handleClick(notification)}
                                    style={{ 
                                        cursor: 'pointer',
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <div className="notification-icon-wrapper">
                                                    <i className="bi bi-bell-fill"></i>
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
                                                        <div className="user-details mb-2 p-2 border-start border-4">
                                                            <strong>Requestor:</strong>{' '}
                                                            {notification.job_order?.user?.lastName}, {notification.job_order?.user?.firstName} ({notification.job_order?.user?.employeeID})
                                                        </div>
                                                        <p className="mb-0 mt-2">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state text-center p-5 fade-in">
                                <i className="bi bi-bell-slash text-muted fs-1 mb-3"></i>
                                <h4>No Notifications</h4>
                                <p className="text-muted">You'll be notified here when there are updates to job orders.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

NotificationsAdmin.layout = (page) => <AdminNavBar>{page}</AdminNavBar>;
export default NotificationsAdmin;