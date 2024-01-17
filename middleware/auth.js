export default function ({ redirect, app }) {
  const token = app.$cookies.get('token')
  if (token === undefined) {
    return redirect('/login')
  }
}
