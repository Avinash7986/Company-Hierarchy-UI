type DataType = 'email' | 'phoneNumber'

export const validate = (type: DataType, data: string) => {
  if (type === 'email') {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (emailRegex.test(data)) {
      return true
    }

    return false
  }

  if (type === 'phoneNumber') {
    const digitRegex = /^[0-9]+$/
    if (digitRegex.test(data) && data.length === 10) {
      return true
    }

    return false
  }
}
