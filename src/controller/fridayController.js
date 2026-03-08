export const fridayController = {
  show: (req, res) => {
    const input = req.query.date
    let d = new Date()

    if (input) {
      // Expect YYYY-MM-DD
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input)
      if (m) {
        const [_, y, mo, day] = m
        d = new Date(Number(y), Number(mo) - 1, Number(day))
      }
    }

    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(d)
    const iso = d.toLocaleDateString('sv-SE')
    const isFriday = d.getDay() === 5

    res.render("friday", {
      title: "Friday",
      iso,
      weekday,
      isFriday
    })
  }
}