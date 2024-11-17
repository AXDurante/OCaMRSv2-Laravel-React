import React from 'react';
import { Head, Link } from '@inertiajs/react';
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
            <div className="flex-fill p-0">
                <div className="px-4 pt-4">
                    <h1 className="d-inline">Notifications | </h1>
                    <h1 className="d-inline fw-light">Job Order Updates</h1>
                    <hr />
                </div>

                <div className="px-4">
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

                    <div className="notifications-list">
                        {notifications.data.length > 0 ? (
                            <>
                                {notifications.data.map((notification, index) => (
                                    <div
                                        key={notification.id}
                                        className={`notification-card fade-in hover-lift mb-4 ${!notification.read_at ? 'unread' : ''}`}
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
                                                                <i className="bi bi-clock me-1"></i>
                                                                {new Date(notification.created_at).toLocaleString()}
                                                            </span>
                                                        </div>

                                                        {notification.job_order && (
                                                            <div className="message-box p-3 mt-2 bg-light rounded">
                                                                <div className="d-flex justify-content-between mb-2">
                                                                    <div>
                                                                        <strong>Job Order:</strong> #{notification.job_order.id}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Status:</strong>{' '}
                                                                        <span className={`status-badge status-${notification.job_order?.status.toLowerCase().replace(' ', '-')}`}>
                                                                            {notification.job_order?.status}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {notification.job_order.user && (
                                                                    <div className="user-details mb-2 p-2 border-start border-4">
                                                                        <strong>Requestor:</strong>{' '}
                                                                        {notification.job_order.user.lastName}, {notification.job_order.user.firstName} ({notification.job_order.user.employeeID})
                                                                    </div>
                                                                )}
                                                                <p className="mb-0 mt-2">{notification.message}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-center mt-4">
                                    <nav aria-label="Notification navigation" className="w-100">
                                        <ul className="pagination">
                                            {notifications.links && notifications.links[0] && (
                                                <li className={`page-item ${!notifications.links[0].url ? 'disabled' : ''}`}>
                                                    <Link
                                                        href={notifications.links[0].url || '#'}
                                                        className="page-link"
                                                        preserveScroll
                                                        preserveState
                                                    >
                                                        Prev
                                                    </Link>
                                                </li>
                                            )}

                                            {notifications.links && notifications.links.slice(1, -1).map((link, index) => (
                                                <li 
                                                    key={index} 
                                                    className={`page-item ${link.active ? 'active' : ''}`}
                                                >
                                                    <Link
                                                        href={link.url || '#'}
                                                        className="page-link"
                                                        preserveScroll
                                                        preserveState
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                </li>
                                            ))}

                                            {notifications.links && notifications.links[notifications.links.length - 1] && (
                                                <li className={`page-item ${!notifications.links[notifications.links.length - 1].url ? 'disabled' : ''}`}>
                                                    <Link
                                                        href={notifications.links[notifications.links.length - 1].url || '#'}
                                                        className="page-link"
                                                        preserveScroll
                                                        preserveState
                                                    >
                                                        Next
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </>
                        ) : (
                            <div className="empty-state text-center p-5 fade-in">
                                <i className="bi bi-bell-slash text-muted fs-1 mb-3"></i>
                                <h4>No Notifications</h4>
                                <p className="text-muted">You'll be notified here when there are updates to your job orders.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

NotificationsTechnician.layout = page => <Navbar2>{page}</Navbar2>;
export default NotificationsTechnician;
