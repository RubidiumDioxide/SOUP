using System;
using System.Collections.Generic;
using aa.Models;
using Microsoft.EntityFrameworkCore;

namespace aa.Models;

public partial class SoupDbContext : DbContext
{
    public SoupDbContext()
    {
    }

    public SoupDbContext(DbContextOptions<SoupDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Action> Actions { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<Team> Teams { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=WIN-4E7JKGBR3SV\\SQLEXPRESS;Database=soup_DB;TrustServerCertificate=True;Encrypt=False;user id=sa;password=1234;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Action>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ACTION__3214EC27E5543B7E");

            entity.ToTable("ACTION");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActorId).HasColumnName("ActorID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.TaskId).HasColumnName("TaskID");

            entity.HasOne(d => d.Actor).WithMany(p => p.Actions)
                .HasForeignKey(d => d.ActorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ACTION__ActorID__35A7EF71");

            entity.HasOne(d => d.Project).WithMany(p => p.Actions)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ACTION__ProjectI__34B3CB38");

            entity.HasOne(d => d.Task).WithMany(p => p.Actions)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ACTION__TaskID__369C13AA");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NOTIFICA__3214EC272761B30E");

            entity.ToTable("NOTIFICATION");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.ReceiverId).HasColumnName("ReceiverID");
            entity.Property(e => e.Role).HasMaxLength(50);
            entity.Property(e => e.SenderId).HasColumnName("SenderID");
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(d => d.Project).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NOTIFICAT__Proje__284DF453");

            entity.HasOne(d => d.Receiver).WithMany(p => p.NotificationReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NOTIFICAT__Recei__2A363CC5");

            entity.HasOne(d => d.Sender).WithMany(p => p.NotificationSenders)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NOTIFICAT__Sende__2942188C");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PROJECT__3214EC27084E958D");

            entity.ToTable("PROJECT", tb => tb.HasTrigger("trg_PreventProjectDelete"));

            entity.HasIndex(e => e.Name, "UQ__PROJECT__737584F63133BD68").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.CreatorNavigation).WithMany(p => p.Projects)
                .HasForeignKey(d => d.Creator)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PROJECT__Creator__1DD065E0");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TASK__3214EC272147807D");

            entity.ToTable("TASK");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AssigneeId).HasColumnName("AssigneeID");
            entity.Property(e => e.CreatorId).HasColumnName("CreatorID");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.Assignee).WithMany(p => p.TaskAssignees)
                .HasForeignKey(d => d.AssigneeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TASK__AssigneeID__30E33A54");

            entity.HasOne(d => d.Creator).WithMany(p => p.TaskCreators)
                .HasForeignKey(d => d.CreatorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TASK__CreatorID__2FEF161B");

            entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TASK__ProjectID__2EFAF1E2");
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TEAM__3214EC2708FB66EC");

            entity.ToTable("TEAM");

            entity.HasIndex(e => new { e.ProjectId, e.Role }, "IX_UC_SingleManagers")
                .IsUnique()
                .HasFilter("([Role] IN ('Руководитель проекта', 'Руководитель отдела дизайна', 'Руководитель отдела разработки', 'Руководитель отдела внедрения и тестирования', 'Руководитель отдела информационной безопасности', 'Руководитель отдела аналитики'))");

            entity.HasIndex(e => new { e.UserId, e.ProjectId, e.Role }, "UQ__TEAM__3E3372012A5FECEC").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.Role).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Project).WithMany(p => p.Teams)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TEAM__ProjectID__23893F36");

            entity.HasOne(d => d.User).WithMany(p => p.Teams)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TEAM__UserID__22951AFD");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__USER__3214EC270A0D43EE");

            entity.ToTable("USER", tb => tb.HasTrigger("trg_PreventUserDelete"));

            entity.HasIndex(e => e.Name, "UQ__USER__737584F6079A5593").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Password).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
