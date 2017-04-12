const adb = require('adbkit')

const client = adb.createClient()

// async function getDeviceInfo(id) {
//   try {
//     const props = await client.getProperties(id)
//     return {
//       id,
//       type: props['ro.product.model'],
//       version: props['ro.build.version.release'],
//     }
//   } catch (error) {
//     throw new Error(`Can not find android device with id: ${id}: ${error}`)
//   }
// }

module.exports = async function findAndroidEmulators() {
  try {
    const devices = await client.listDevices()

    if (!devices.length) {
      throw new Error('Devices list is empty')
    }

    return devices

    // if (id) {
    //   return getDeviceInfo(id)
    // }
    // // Get first android device
    // const device = devices[0]
    // // Get device info
    // const props = await client.getProperties(device.id)
    // return {
    //   id: device.id,
    //   type: props['ro.product.model'],
    //   version: props['ro.build.version.release'],
    // }
  } catch (error) {
    throw new Error(`Can not find any android devices: ${error}`)
  }
}
