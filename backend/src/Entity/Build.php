<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class Build
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Hero::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Hero $hero = null;

    #[ORM\Column(length: 100)]
    private string $name = '';

    #[ORM\Column(type: 'text')]
    private string $description = '';

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    private \DateTimeImmutable $updatedAt;

    #[ORM\Column]
    private bool $isPublic = false;

    #[ORM\OneToMany(mappedBy: 'build', targetEntity: BuildUpgrade::class, cascade: ['persist', 'remove'])]
    private Collection $buildUpgrades;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->buildUpgrades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getHero(): ?Hero
    {
        return $this->hero;
    }

    public function setHero(?Hero $hero): self
    {
        $this->hero = $hero;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function isPublic(): bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): self
    {
        $this->isPublic = $isPublic;
        return $this;
    }

    /**
     * @return Collection<int, BuildUpgrade>
     */
    public function getBuildUpgrades(): Collection
    {
        return $this->buildUpgrades;
    }

    public function addBuildUpgrade(BuildUpgrade $buildUpgrade): self
    {
        if (!$this->buildUpgrades->contains($buildUpgrade)) {
            $this->buildUpgrades->add($buildUpgrade);
            $buildUpgrade->setBuild($this);
        }

        return $this;
    }

    public function removeBuildUpgrade(BuildUpgrade $buildUpgrade): self
    {
        if ($this->buildUpgrades->removeElement($buildUpgrade)) {
            if ($buildUpgrade->getBuild() === $this) {
                $buildUpgrade->setBuild(null);
            }
        }

        return $this;
    }
}
