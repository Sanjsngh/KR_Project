function Profile({ profile }) {
    return (
      <div class="profile-container">

        {
            profile ? (
                <div>
                    <h1 className="profile-heading">Welcome {profile.username}!</h1>
                    {profile.image && (
                        <img
                            src={profile.image}
                            alt="Profile"
                            className="profile-image"
                            width="150"
                            height="150"
                            style={{ borderRadius: '50%', marginTop: '20px' }}
                        />
                    )}

                
                </div>
            ) : (
                <h1 className="profile-heading">Profile Loading...</h1>
            )
        }
      </div>
    );
}
export default Profile;
  