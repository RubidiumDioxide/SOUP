using System;
using System.Collections.Generic;

namespace aa.Models;

public partial class Repository
{
    public int Id { get; set; }

    public string GithubName { get; set; } = null!;

    public string GithubCreator { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
