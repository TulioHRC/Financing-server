-- CreateTable
CREATE TABLE "Currency" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quotation_in_BRL" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyOperations" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bought_currency_id" TEXT NOT NULL,
    "selled_currency_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyOperations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investiments" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "investiment_type" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "currency_id" TEXT NOT NULL,

    CONSTRAINT "Investiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestimentsPrices" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "investiment_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvestimentsPrices_pkey" PRIMARY KEY ("investiment_id")
);

-- CreateTable
CREATE TABLE "InvestimentsOperations" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "investiment_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestimentsOperations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestimentsDividends" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "investiment_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "value_after_fees" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestimentsDividends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Investiments_name_key" ON "Investiments"("name");

-- AddForeignKey
ALTER TABLE "CurrencyOperations" ADD CONSTRAINT "CurrencyOperations_bought_currency_id_fkey" FOREIGN KEY ("bought_currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyOperations" ADD CONSTRAINT "CurrencyOperations_selled_currency_id_fkey" FOREIGN KEY ("selled_currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investiments" ADD CONSTRAINT "Investiments_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestimentsPrices" ADD CONSTRAINT "InvestimentsPrices_investiment_id_fkey" FOREIGN KEY ("investiment_id") REFERENCES "Investiments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestimentsOperations" ADD CONSTRAINT "InvestimentsOperations_investiment_id_fkey" FOREIGN KEY ("investiment_id") REFERENCES "Investiments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestimentsDividends" ADD CONSTRAINT "InvestimentsDividends_investiment_id_fkey" FOREIGN KEY ("investiment_id") REFERENCES "Investiments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
