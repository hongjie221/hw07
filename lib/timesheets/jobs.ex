defmodule Timesheets.Jobs do
  @moduledoc """
  The Jobs context.
  """

  import Ecto.Query, warn: false
  alias Timesheets.Repo

  alias Timesheets.Jobs.Job

  @doc """
  Returns the list of jobs.

  ## Examples

      iex> list_jobs()
      [%Job{}, ...]

  """
  def list_jobs do
    Repo.all(Job)
  end

  @doc """
  Gets a single job.

  Raises `Ecto.NoResultsError` if the Job does not exist.

  ## Examples

      iex> get_job!(123)
      %Job{}

      iex> get_job!(456)
      ** (Ecto.NoResultsError)

  """
  def get_job!(id), do: Repo.get!(Job, id)

  @doc """
  Creates a job.

  ## Examples

      iex> create_job(%{field: value})
      {:ok, %Job{}}

      iex> create_job(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job(attrs \\ %{}) do
    %Job{}
    |> Job.changeset(attrs)
    |> Repo.insert()
  end

  def list_job_codes do
    query = from(j in Job, select: {j.jobcode})
    IO.inspect(Enum.map(Repo.all(query), fn {x} -> x end))
  end

  @doc """
  Updates a job.

  ## Examples

      iex> update_job(job, %{field: new_value})
      {:ok, %Job{}}

      iex> update_job(job, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_job(%Job{} = job, attrs) do
    job
    |> Job.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Job.

  ## Examples

      iex> delete_job(job)
      {:ok, %Job{}}

      iex> delete_job(job)
      {:error, %Ecto.Changeset{}}

  """
  def delete_job(%Job{} = job) do
    Repo.delete(job)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking job changes.

  ## Examples

      iex> change_job(job)
      %Ecto.Changeset{source: %Job{}}

  """
  def change_job(%Job{} = job) do
    Job.changeset(job, %{})
  end

  def get_job_code_by_id(job_id) do
    query = from(j in Job, where: j.id == ^job_id)
    job = Repo.all(query)
    job = Enum.at(job, 0)
    job.jobcode
  end

  def get_job_id_by_code(job_code) do
    query = from(j in Job, where: j.jobcode == ^job_code)
    job = Repo.all(query)
    job = Enum.at(job, 0)
    job.id
  end

  def get_budget_by_code(job_code) do
    query = from(j in Job, where: j.jobcode == ^job_code)
    job = Repo.all(query)
    job = Enum.at(job, 0)
    job.budget
  end

  def substract_budget_by_job_code(job_code, hour) do
    from(j in Job, where: j.jobcode == ^job_code)
    |> Repo.update_all(set: [budget: get_budget_by_code(job_code) - hour])
  end




end
