const ChangePassword = () => {
  return (
    <>
      <h2 className="font-bold mb-16">Change Password</h2>
      <div className="mb-8 w-[320px]">
        <form>
          <fieldset className="mb-8">
            <label htmlFor="currentPassword" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Current Password</label>
            <input id="currentPassword" name="currentPassword" className="border-[1px] outline-none block px-4 py-2 rounded w-full" type="password" value="" />
          </fieldset>

          <fieldset className="mb-8">
            <label htmlFor="newPassword" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">New Password</label>
            <input id="newPassword" name="newPassword" className="border-[1px] outline-none block px-4 py-2 rounded w-full" type="password" value="" />
          </fieldset>

           <fieldset className="mb-8">
            <label htmlFor="confirmNewPassword" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Confirm New Password</label>
            <input id="confirmNewPassword" name="confirmNewPassword" className="border-[1px] outline-none block px-4 py-2 rounded w-full" type="password" value="" />
          </fieldset>

          <button className="bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm">Change Password</button>
        </form>
      </div>
    </>)
}

export default ChangePassword