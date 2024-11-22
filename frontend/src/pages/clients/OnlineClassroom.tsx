import React, { useEffect, useRef } from "react";

const OnlineClassroom: React.FC = () => {
    const iframeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const domain = "meet.jit.si";
        const options = {
            roomName: `Classroom-${Date.now()}`, // Tên phòng học động
            width: "100%",
            height: "100%",
            parentNode: iframeRef.current,
            configOverwrite: {
                startWithAudioMuted: true,
                startWithVideoMuted: true,
            },
            interfaceConfigOverwrite: {
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            },
            userInfo: {
                displayName: "Teacher Name",
                email: "teacher@example.com",
            },
        };

        const api = new (window as any).JitsiMeetExternalAPI(domain, options);

        return () => api?.dispose();
    }, []);

    return <div className="h-screen w-full bg-gray-100" ref={iframeRef}></div>;
};

export default OnlineClassroom;
