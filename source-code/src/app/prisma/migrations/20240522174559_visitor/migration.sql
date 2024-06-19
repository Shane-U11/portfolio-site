-- CreateTable
CREATE TABLE "visitor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "ipAddress" TEXT,
    "updatedAt" DATE,
    "isEngineeringManager" BOOLEAN NOT NULL,
    "isTechRecruiter" BOOLEAN NOT NULL,
    "isFellowDeveloper" BOOLEAN NOT NULL,
    "visitCount" TEXT NOT NULL,

    CONSTRAINT "visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_ipAddress_key" ON "visitor"("ipAddress");
