

export function slugify(title: string): string {
    // title = "This is my first article"
    // return -> "this-is-my-first-article"
  
    let slugarr = new Array<string>();
    
    for (let i = 0; i < title.length; i++) {
      if (i >= 30) break;
  
      let char = title[i].toLowerCase()
      if (char >= "a" && char <= "z") {
        slugarr.push(char)
      } else {
        slugarr.push("-")
      }
    }
    return slugarr.join('')
  }
  
  //slugify("this is my fun")
