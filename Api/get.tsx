useEffect(() => {
  let isActive = true;
  const ac = new AbortController();

  async function getMovies() {
    const params = {
      params: {
        language: 'pt-BR',
        page: 1,
        region: 'BR'
      }
    }

    const [nowResponse, popularResponse, topResponse] = await Promise.all([
      api.get<MovieDBResponse>('/movie/now_playing', params),
      api.get<MovieDBResponse>('/movie/popular', params),
      api.get<MovieDBResponse>('/movie/top_rated', params),
    ]);

    if (isActive) {
      const nowData = nowResponse.data.results;
      const popularData = popularResponse.data.results;
      const topData = topResponse.data.results;

      setBannerMovie(randomItem(nowData))
      setNowMovies(nowData.slice(0, 10));
      setPopularMovies(popularData.slice(0, 5));
      setTopMovies(topData.slice(0, 5));
      setLoading(false);
    }
  }
  getMovies();

  return () => {
    isActive = false;
    ac.abort();
  }
}, []);

useEffect(() => {
  let isActive = true;
  const ac = new AbortController();

  async function getMovie() {
    const response = await api.get(`/movie/${route.params?.id}`, {
      params: { language: 'pt-BR' }
    });

    if (isActive) {
      setMovie(response.data);
      setLoading(false);

      const isSaved = await hasMovie(response.data);
      setMovieSaved(isSaved);
    }
  }
  getMovie();
  return () => {
    isActive = false;
    ac.abort();
  }
}, []);