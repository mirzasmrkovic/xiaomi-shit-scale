import noble from 'noble-mac'
// let peripheralID = 'e0ff1a5adf4f43ea87fd067f66ce3395'

export const connectPeripheral = (peripheralID, onChange) => {
  noble.startScanning()
  noble.on('discover', peripheral => {
    if (peripheral.id === peripheralID) {
      console.log(peripheralID)
      noble.stopScanning()
      peripheral.connect(() => {
        peripheral.discoverServices(['181d'], (e, services) => {
          let scaleService = services[0]
          scaleService.discoverCharacteristics(
            ['2a9d'],
            (e, characteristics) => {
              // Weight Measurement Characteristics
              let weightChar = characteristics[0]
              weightChar.subscribe()
              weightChar.on('data', data => {
                let status = data.readIntLE(0, 1)
                let weight = data.readUInt16LE(1) / 200
                let isStabilized = status > 2 ? true : false
                let isRemoved = status < 0 ? true : false
                console.log(weight)
                onChange(weight)
                console.log(isStabilized ? 'isStabilized' : 'notStabilized')
                console.log(isRemoved ? 'isRemoved' : 'notRemoved')
              })
            }
          )
        })
      })
    }
  })
}
