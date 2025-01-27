import React, { useEffect, useState } from "react";
import axios from "axios";


const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("https://server-wheat-xi.vercel.app/api/user/find/",{
                    withCredentials:true
                });
                // photoURL
                console.log(response.data.data)
                setProfile(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-600">
        
        </div>;
    }

    if (!profile) {
        return <div className="text-center py-20 text-red-500">Error loading profile data.</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
            {/* Profile Card */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <img
                        src={profile.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                    {/* Name */}
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h2>
                    {/* Role */}
                    <p className="text-gray-600">{profile.role || "User"}</p>
                </div>
                {/* Details */}
                <div className="mt-6">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Email:</span>
                        <span className="text-gray-800">{profile.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Phone:</span>
                        <span className="text-gray-800">{profile.phone || "N/A"}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-500">Joined:</span>
                        <span className="text-gray-800">
                            {new Date(profile.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                {/* Actions */}
                <div className="mt-6 text-center">
                    <button className="bg-main text-white px-4 py-2 rounded-md hover:bg-text transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
