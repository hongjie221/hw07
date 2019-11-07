defmodule TimesheetsWeb.JobView do
  use TimesheetsWeb, :view
  alias TimesheetsWeb.JobView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "jobcode.json")}
  end

  def render("jobcode.json", %{job: job}) do
    %{jobcode: job}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      jobcode: job.jobcode,
      budget: job.budget,
      description: job.description}
  end
end
