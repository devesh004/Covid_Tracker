const fillData = async () => {
  fetch("https://api.covid19api.com/countries")
    .then((data) => {
      return data.json();
    })
    .then((countries) => {
      console.log(countries.data.length);
      let i = 0;
      (function loop() {
        console.log(countries.data[i]);
        if (++i < countries.length) {
          setTimeout(loop, 1000);
        }
      })();
    });
};

fillData();
