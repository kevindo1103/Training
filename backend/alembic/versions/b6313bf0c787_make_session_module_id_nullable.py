"""make session module_id nullable

Revision ID: b6313bf0c787
Revises: d7a93d811f3a
Create Date: 2026-07-08 17:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'b6313bf0c787'
down_revision: Union[str, Sequence[str], None] = 'd7a93d811f3a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("sessions") as batch_op:
        batch_op.alter_column("module_id", existing_type=sa.Text(), nullable=True)


def downgrade() -> None:
    with op.batch_alter_table("sessions") as batch_op:
        batch_op.alter_column("module_id", existing_type=sa.Text(), nullable=False)
