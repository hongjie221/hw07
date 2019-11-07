defmodule Timesheets.Sheets.Sheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sheets" do
    field :date, :date
    field :status, :boolean, default: false
    belongs_to :worker, Timesheets.Workers.Worker
    has_many :tasks, Timesheets.Tasks.Task
    timestamps()
  end

  @doc false
  def changeset(sheet, attrs) do
    sheet
    |> cast(attrs, [:status, :date])
    |> validate_required([:status, :date])
  end
end
