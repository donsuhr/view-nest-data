function convertData(json) {
  return Object.entries(json).flatMap(
    ([day, dayObj]) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      dayObj.cycles.map(({ startTs, duration }) => ({
        startTs,
        duration,
      })),
    // eslint-disable-next-line function-paren-newline
  );
}

function processEncounteredMonth(acc, date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  acc[year][month] = {};
  const end = new Date(date.getTime());
  end.setDate(1);
  if (month === 12) {
    end.setFullYear(year + 1);
    end.setMonth(0);
  } else {
    end.setMonth(month);
  }
  const counter = new Date(date.getTime());
  counter.setDate(1);
  while (counter < end) {
    acc[year][month][counter.getDate()] = {
      cycles: [],
      date: new Date(counter.getTime()),
    };
    counter.setDate(counter.getDate() + 1);
  }
}

function byDay(cycles) {
  return cycles.reduce((acc, cycle) => {
    const date = new Date(cycle.startTs);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (!Object.hasOwnProperty.call(acc, year)) {
      acc[year] = {};
    }
    if (!Object.hasOwnProperty.call(acc[year], month)) {
      processEncounteredMonth(acc, date);
    }
    acc[year][month][day].cycles.push(cycle);
    return acc;
  }, {});
}

function doFetch(url) {
  return fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then((response) => response.json());
}

function loadDataSet(prefix) {
  const startDate = new Date(2019, 8, 1);
  const endDate = new Date(2020, 1, 1);

  const counter = new Date(startDate.getTime());

  const urls = [];
  while (counter < endDate) {
    const month = counter.getMonth();
    const monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const str = `${prefix}/${counter.getFullYear()}/${monthStr}/${counter.getFullYear()}-${monthStr}-summary.json`;
    urls.push(str);
    if (month === 11) {
      counter.setFullYear(counter.getFullYear() + 1);
      counter.setMonth(0);
    } else {
      counter.setMonth(month + 1);
    }
  }
  const fetches = urls.map((x) => doFetch(x));
  return Promise.all(fetches).then((values) => ({ key: prefix, values }));
}

const store = {
  namespaced: true,
  state: {
    loading: false,
    data: { 'data-in': {} },
  },
  mutations: {
    loading(state, isLoading) {
      state.loading = isLoading;
    },
    data(state, data) {
      state.data = data;
    },
  },
  actions: {
    async loadDecember({ commit, state }) {
      commit('loading', true);
      const loaders = await Promise.all([
        loadDataSet('takeout-1'),
        loadDataSet('takeout-2'),
        loadDataSet('takeout-3'),
      ]);
      const data = loaders.reduce((acc, dataSet) => {
        acc[dataSet.key] = byDay(dataSet.values.flatMap(convertData));
        return acc;
      }, {});

      commit('data', data);
      commit('loading', false);
    },
    toggleGridView({ commit, state, rootState }) {
      commit('isGridView', !state.isGridView);
    },
  },
  getters: {
    data: (state) => state.data,
    sets: (state) => Object.keys(state.data),
    years: (state) => [
      ...new Set(
        Object.values(state.data).flatMap((val) => Object.keys(val).sort((a, b) => a - b)),
      ),
    ],
    months: (state) => (year) => [
      ...new Set(
        Object.values(state.data).flatMap((dataSet) => (dataSet[year]
          ? Object.keys(dataSet[year]).map((x) => parseInt(x, 10))
          : [])),
      ),
    ].sort((a, b) => a - b),
  },
};

export { store };
