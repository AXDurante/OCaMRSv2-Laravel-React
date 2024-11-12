import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar2 from '@/Layouts/Navbar2';
import axios from 'axios';

function NotificationsTechnician({ notifications }) {
    const handleClick = async (notification) => {
        try {
            await axios.post(`/technician/notifications/${notification.id}/mark-as-read`);
            
            if (notification.job_order) {
                window.location.href = `/technician/showJobOrder/${notification.job_order.id}`;
            }
            
            window.dispatchEvent(new CustomEvent('updateNotificationCount'));
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/technician/notifications/mark-all-as-read');
            window.location.reload();
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    return (
        <>
            <Head title="Notifications" />
            <div className="container mt-4">
                <div className="notifications-container p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0">Notifications</h2>
                        {notifications?.length > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="btn btn-primary"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {!notifications?.length ? (
                        <div className="text-center py-4">
                            <i className="bi bi-bell" style={{ fontSize: '2rem' }}></i>
                            <p className="mt-2">No notifications</p>
                        </div>
                    ) : (
                        <div className="notification-list">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-card p-3 mb-3 ${!notification.read_at ? 'unread' : ''}`}
                                    onClick={() => handleClick(notification)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-start">
                                        <div className="notification-icon-wrapper me-3">
                                            <i className="bi bi-bell-fill text-primary"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="notification-title mb-1">
                                                {notification.title}
                                            </h5>
                                            {notification.job_order && (
                                                <div className="message-box p-2 mt-2">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div>
                                                            <strong>Job Order:</strong> #{notification.job_order.id}
                                                        </div>
                                                        <div>
                                                            <strong>Status:</strong>{' '}
                                                            <span className={`text-${notification.job_order.status.toLowerCase()}`}>
                                                                {notification.job_order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {notification.job_order.user && (
                                                        <div className="user-details mb-2">
                                                            <strong>Requestor:</strong>{' '}
                                                            {notification.job_order.user.lastName}, {notification.job_order.user.firstName} ({notification.job_order.user.employeeID})
                                                        </div>
                                                    )}
                                                    <p className="mb-0">{notification.message}</p>
                                                </div>
                                            )}
                                            <small className="notification-date d-block mt-2 text-muted">
                                                {new Date(notification.created_at).toLocaleString()}
                                            </small>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="unread-indicator"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

NotificationsTechnician.layout = page => <Navbar2>{page}</Navbar2>;
export default NotificationsTechnician;
