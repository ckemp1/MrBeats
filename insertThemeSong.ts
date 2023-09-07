import fs from "fs"
// export const insertThemeSong = (id: string, fileName: string) => {
//   var data = fs.readFileSync("./data/themeSongs.json", "utf-8")
//   var themeSongs = Array.from(JSON.parse(data))

//   // Check if Id already exists before adding a new entry
//   var newUser = true
//   for (var i = 0; i < themeSongs.length; i++) {
//     if (themeSongs[i]["id"] === id) {
//       newUser = false
//       themeSongs[i]["fileName"] = fileName
//       break
//     }
//   }
//   console.log(`new user?: ${newUser}`)
//   if (newUser) {
//     console.log("NEW")
//     themeSongs.push({ id: id, fileName: fileName })
//   }

//   data = JSON.stringify(themeSongs, null, 4)
//   fs.writeFileSync("./data/themeSongs.json", data)
// }
