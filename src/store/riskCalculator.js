const state = {
  assets: [],
  weights: [],
  results: {},
};

const getters = {
  totalWeights(state) {
    return state.weights.reduce((total, weight) => total + parseFloat(weight), 0);
  },
};

const mutations = {
  setAssets(state, assets) {
    state.assets = assets;
  },
  setWeights(state, weights) {
    state.weights = weights;
  },
  setResults(state, results) {
    state.results = results;
  },
};

const actions = {
  calculateRisk({ state, commit, getters }) {
    if (state.assets.length !== state.weights.length) {
      console.error("Количество активов и весов должно совпадать.");
      return;
    }

    const totalWeights = getters.totalWeights;
    const weightsNormalized = state.weights.map((weight) => parseFloat(weight) / totalWeights);

    const returnRate = calculateReturnRate(state.assets, weightsNormalized);
    const stdDev = calculateStandardDeviation(state.assets, weightsNormalized);
    const correlation = calculateCorrelation(state.assets);
    const beta = calculateBeta(correlation, stdDev);
    const var95 = calculateVaR(returnRate, stdDev, 0.05);
    const cvar95 = calculateCVaR(returnRate, stdDev, 0.05);

    const results = {
      return: returnRate * 100, 
      stdDev,
      correlation,
      beta,
      var95,
      cvar95,
    };

    commit("setResults", results);
  },
};

function calculateReturnRate(assets, weights) {
  return assets.reduce((total, asset, index) => total + (parseFloat(asset) * parseFloat(weights[index])), 0);
}

function calculateStandardDeviation(assets, weights) {
  const weightedReturns = assets.map((asset, index) => parseFloat(asset) * parseFloat(weights[index]));
  const meanReturn = weightedReturns.reduce((total, weightedReturn) => total + weightedReturn, 0);
  const squaredDifferences = weightedReturns.map((weightedReturn) => Math.pow(weightedReturn - meanReturn, 2));
  const variance = squaredDifferences.reduce((total, squaredDifference) => total + squaredDifference, 0) / assets.length;
  return Math.sqrt(variance);
}

function calculateCorrelation(assets) {
  return 0.5;
}


function calculateBeta(correlation, stdDev) {
  return correlation * (stdDev / 100);
}


function calculateVaR(returnRate, stdDev, confidenceLevel) {
  const zScore = Math.abs(normsInv(confidenceLevel));
  return returnRate - (zScore * stdDev);
}


function calculateCVaR(returnRate, stdDev, confidenceLevel) {
  const zScore = Math.abs(normsInv(confidenceLevel));
  return returnRate - ((stdDev / (1 - confidenceLevel)) * normsPDF(zScore));
}
function normsInv(p) {
  const a1 = -39.6968302866538;
  const a2 = 220.946098424521;
  const a3 = -275.928510446969;
  const a4 = 138.357751867269;
  const a5 = -30.6647980661472;
  const a6 = 2.50662827745924;
  const b1 = -54.4760987982241;
  const b2 = 161.585836858041;
  const b3 = -155.698979859887;
  const b4 = 66.8013118877197;
  const b5 = -13.2806815528857;
  const c1 = -7.78489400243029E-03;
  const c2 = -0.322396458041136;
  const c3 = -2.40075827716184;
  const c4 = -2.54973253934373;
  const c5 = 4.37466414146497;
  const c6 = 2.93816398269878;
  const d1 = 7.78469570904146E-03;
  const d2 = 0.32246712907004;
  const d3 = 2.445134137143;
  const d4 = 3.75440866190742;
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  let q;
  if (p < 0 || p > 1) {
    console.error("NormsInv: Argument out of range.");
    return 0;
  } else if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    const r = q * q;
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * q) / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
}

function normsPDF(x) {
  return Math.exp(-0.5 * x * x) / (Math.sqrt(2 * Math.PI));
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};