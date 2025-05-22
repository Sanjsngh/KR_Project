function Profile({ profile }) {
    return (
      <div class="profile-container">

        {
            profile ? (
                <div>
                    <h1 class="profile-heading">Welcome {profile.username}!</h1>
                </div>
            ) : (
                <h1 class="profile-heading">Profile Loading...</h1>
            )
        }
      </div>
    );
}
export default Profile;
  