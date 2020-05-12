CREATE OR REPLACE VIEW covid.new_cases_and_deaths_vw AS (
       SELECT
        date,
        state,
        cases,
        cases - LAG(cases) OVER (PARTITION BY state ORDER BY date) AS new_cases,
        deaths,
        deaths - LAG(deaths) OVER (PARTITION BY state ORDER BY date) AS new_deaths
       FROM covid.nytimes_us_states
);
