defmodule Timesheets.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :hours, :integer, null: false
      add :note, :string, null: false
      add :job_id, references(:jobs, on_delete: :nothing), null: false
      add :sheet_id, references(:sheets, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:tasks, [:job_id])
    create index(:tasks, [:sheet_id])
  end
end
