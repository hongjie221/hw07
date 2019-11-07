defmodule Timesheets.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :integer
    field :description, :string
    field :jobcode, :string
    belongs_to :manager, Timesheets.Managers.Manager
    has_many :tasks, Timesheets.Tasks.Task
    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:jobcode, :budget, :description])
    |> validate_required([:jobcode, :budget, :description])
  end
end
