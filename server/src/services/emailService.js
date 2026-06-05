const sendPasswordResetEmail = async ({ email }) => {
  console.log(`Password reset requested for ${email}. Configure an email provider for production.`)
  return true
}

module.exports = { sendPasswordResetEmail }
