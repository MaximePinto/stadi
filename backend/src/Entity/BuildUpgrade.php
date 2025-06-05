<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class BuildUpgrade
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Build::class, inversedBy: 'buildUpgrades')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Build $build = null;

    #[ORM\ManyToOne(targetEntity: Upgrade::class, inversedBy: 'buildUpgrades')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Upgrade $upgrade = null;

    #[ORM\Column]
    private int $slot = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBuild(): ?Build
    {
        return $this->build;
    }

    public function setBuild(?Build $build): self
    {
        $this->build = $build;
        return $this;
    }

    public function getUpgrade(): ?Upgrade
    {
        return $this->upgrade;
    }

    public function setUpgrade(?Upgrade $upgrade): self
    {
        $this->upgrade = $upgrade;
        return $this;
    }

    public function getSlot(): int
    {
        return $this->slot;
    }

    public function setSlot(int $slot): self
    {
        $this->slot = $slot;
        return $this;
    }
}
